var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var database = require('./database');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const salt = process.env.SALT ? process.env.SALT : 'salt';
const secret = process.env.SECRET ? process.env.SECRET : 'secret';


/**
 * 
 * @param {String} password 
 * @returns Base64 encoded hashed password.
 */
function saltAndHashPassword(password) {
    password = salt + password + salt;
    let hash = crypto.createHash('sha256').update(password).digest('base64');
    let hash2 = crypto.createHash('sha256').update(hash).digest('base64');
    let hash3 = crypto.createHash('sha256').update(hash2).digest('base64');
    return hash3;
}

/**
 * Check whether or not the given username and password are valid.
 * @param {String} username - username of the user you are trying to retrieve.
 * @param {String} password - plaintext password to check.
 * @returns {Promise<Boolean>}
 */
async function checkPassword(username, password) {
    let user = await database.getUser(username);
    return user && user.password === saltAndHashPassword(password);
}

/**
 * Creates a new set of credentials with the given username and password.
 * `password` should be UNHASHED; the function will call `hashPassword` to hash it.
 * @param {String} username 
 * @param {String} password 
 * @returns {Void}
 */
async function updatePassword(username, password) {
    await database.editAttribute(username, 'password', saltAndHashPassword(password));
}

/**
 * Checks that the token is valid and stores the corrent username.
 * `checkToken` guarantees that the username is in the database if the token is valid.
 * @param {String} username 
 * @param {String} token 
 * @returns {Promise<Boolean>} Promise that resolves to true if the token is valid and false otherwise.
 */
function checkToken(username, token) {
    return jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return false;
        } else {
            return decoded.username === username;
        }
    });
}

/**
 * Creates a new token for the given username.
 * This token may be used for authentication purposes.
 * @param {String} username 
 * @returns A JWT token.
 */
function generateToken(username) {
    return jwt.sign({ username: username }, secret);
}

module.exports = {
    saltAndHashPassword, checkPassword, checkToken, updatePassword, generateToken
};