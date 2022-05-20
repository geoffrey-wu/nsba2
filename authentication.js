var crypto = require('crypto');
var jwt = require('jsonwebtoken');
const secret = process.env.SECRET ? process.env.SECRET : 'secret';
const salt = process.env.SALT ? process.env.SALT : 'salt';


if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

var database = require('./database');

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
 * 
 * @param {String} username 
 * @param {String} password 
 */
async function checkPassword(username, password) {
    let user = await database.getUser(username);
    return user && user.password === saltAndHashPassword(password);
}

/**
 * Checks that the token is valid and stores the corrent username.
 * `checkToken` guarantees that the username is in the database if the token is valid.
 * @param {String} username 
 * @param {String} token 
 * @returns Promise that resolves to true if the token is valid and false otherwise.
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
 * Creates a new set of credentials with the given username and password.
 * `password` should be UNHASHED; the function will call `hashPassword` to hash it.
 * @param {String} username 
 * @param {String} password 
 */
async function updatePassword(username, password) {
    await database.editAttribute(username, 'password', saltAndHashPassword(password));
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