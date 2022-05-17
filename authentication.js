var crypto = require('crypto');
var jwt = require('jsonwebtoken');
const secret = process.env.SECRET ? process.env.SECRET : 'ChBvkoAPoyZ7gdaxIRwjcA5P6G8IuFbANrmcW+KJ';
const salt = process.env.SALT ? process.env.SALT : 'ncrjxNrTdw+CSFG/5VAX1zArYYaAZ4s3Vd6Jse+Q';

/**
 * NEVER store plaintext passwords. These passwords should be salted and hashed.
 */
var passwords = {
    admin: 'KT8FbMVkWahCZDyOTMw47+ajO/uwQXLIaOQHQF3FVsY=',
    ThisIsDenry: 'KT8FbMVkWahCZDyOTMw47+ajO/uwQXLIaOQHQF3FVsY=',
    chickennugget: 'KT8FbMVkWahCZDyOTMw47+ajO/uwQXLIaOQHQF3FVsY=',
    Fez_Keyreb: 'KT8FbMVkWahCZDyOTMw47+ajO/uwQXLIaOQHQF3FVsY=',
    VulcanForge: 'KT8FbMVkWahCZDyOTMw47+ajO/uwQXLIaOQHQF3FVsY=',
    aurum: 'KT8FbMVkWahCZDyOTMw47+ajO/uwQXLIaOQHQF3FVsY=',
    cryo: 'KT8FbMVkWahCZDyOTMw47+ajO/uwQXLIaOQHQF3FVsY=',
    Hoatzin: 'KT8FbMVkWahCZDyOTMw47+ajO/uwQXLIaOQHQF3FVsY=',
    arjunkie: 'KT8FbMVkWahCZDyOTMw47+ajO/uwQXLIaOQHQF3FVsY=',
    cymbidium: 'KT8FbMVkWahCZDyOTMw47+ajO/uwQXLIaOQHQF3FVsY=',
    Aditya: 'KT8FbMVkWahCZDyOTMw47+ajO/uwQXLIaOQHQF3FVsY=',
    SirMrDudeManGuy : 'KT8FbMVkWahCZDyOTMw47+ajO/uwQXLIaOQHQF3FVsY=',
    akul: 'KT8FbMVkWahCZDyOTMw47+ajO/uwQXLIaOQHQF3FVsY=',
    TechnologicalError: 'KT8FbMVkWahCZDyOTMw47+ajO/uwQXLIaOQHQF3FVsY=',
    Cyaniphor: 'KT8FbMVkWahCZDyOTMw47+ajO/uwQXLIaOQHQF3FVsY=',
    Bomjoe: 'KT8FbMVkWahCZDyOTMw47+ajO/uwQXLIaOQHQF3FVsY=',
    Viraj: 'KT8FbMVkWahCZDyOTMw47+ajO/uwQXLIaOQHQF3FVsY=',
    'a new rag': 'KT8FbMVkWahCZDyOTMw47+ajO/uwQXLIaOQHQF3FVsY=',
    ne: 'KT8FbMVkWahCZDyOTMw47+ajO/uwQXLIaOQHQF3FVsY=',
    katy1243: 'KT8FbMVkWahCZDyOTMw47+ajO/uwQXLIaOQHQF3FVsY=',
    'smol boi eli': 'KT8FbMVkWahCZDyOTMw47+ajO/uwQXLIaOQHQF3FVsY=',
    GidTheKid2: 'KT8FbMVkWahCZDyOTMw47+ajO/uwQXLIaOQHQF3FVsY=',
    Frozensnakes20: 'KT8FbMVkWahCZDyOTMw47+ajO/uwQXLIaOQHQF3FVsY=',
    thecoolchicken: 'KT8FbMVkWahCZDyOTMw47+ajO/uwQXLIaOQHQF3FVsY=',
    hexacyanoferrate: 'KT8FbMVkWahCZDyOTMw47+ajO/uwQXLIaOQHQF3FVsY=',
    Deadbird402: 'KT8FbMVkWahCZDyOTMw47+ajO/uwQXLIaOQHQF3FVsY=',
    Vish: 'KT8FbMVkWahCZDyOTMw47+ajO/uwQXLIaOQHQF3FVsY=',
    minitarrasque: 'KT8FbMVkWahCZDyOTMw47+ajO/uwQXLIaOQHQF3FVsY=',
    Fingy: 'KT8FbMVkWahCZDyOTMw47+ajO/uwQXLIaOQHQF3FVsY=',
    noxin: 'KT8FbMVkWahCZDyOTMw47+ajO/uwQXLIaOQHQF3FVsY=',
    RussellGeorgi: 'KT8FbMVkWahCZDyOTMw47+ajO/uwQXLIaOQHQF3FVsY=',
    pyro: 'KT8FbMVkWahCZDyOTMw47+ajO/uwQXLIaOQHQF3FVsY=',
    oof7373: 'KT8FbMVkWahCZDyOTMw47+ajO/uwQXLIaOQHQF3FVsY=',
    powerpunch2006: 'KT8FbMVkWahCZDyOTMw47+ajO/uwQXLIaOQHQF3FVsY=',
    kahtrashcan: 'KT8FbMVkWahCZDyOTMw47+ajO/uwQXLIaOQHQF3FVsY=',
    'Amiable Jaekelopterus': 'KT8FbMVkWahCZDyOTMw47+ajO/uwQXLIaOQHQF3FVsY=',
    ChessFun: 'KT8FbMVkWahCZDyOTMw47+ajO/uwQXLIaOQHQF3FVsY=',
    bcao0003: 'KT8FbMVkWahCZDyOTMw47+ajO/uwQXLIaOQHQF3FVsY=',
    LukaIsOP: 'KT8FbMVkWahCZDyOTMw47+ajO/uwQXLIaOQHQF3FVsY=',
    'onerous yakovlev': 'KT8FbMVkWahCZDyOTMw47+ajO/uwQXLIaOQHQF3FVsY=',
    sophie: 'KT8FbMVkWahCZDyOTMw47+ajO/uwQXLIaOQHQF3FVsY=',
    'nipu d': 'KT8FbMVkWahCZDyOTMw47+ajO/uwQXLIaOQHQF3FVsY=',
    n95: 'KT8FbMVkWahCZDyOTMw47+ajO/uwQXLIaOQHQF3FVsY=',
    TukiTats: 'KT8FbMVkWahCZDyOTMw47+ajO/uwQXLIaOQHQF3FVsY=',
    WeisPickle: 'KT8FbMVkWahCZDyOTMw47+ajO/uwQXLIaOQHQF3FVsY=',
    BeanBoi13: 'KT8FbMVkWahCZDyOTMw47+ajO/uwQXLIaOQHQF3FVsY=',
    ClownFrogg: 'KT8FbMVkWahCZDyOTMw47+ajO/uwQXLIaOQHQF3FVsY=',
    jucijuce: 'KT8FbMVkWahCZDyOTMw47+ajO/uwQXLIaOQHQF3FVsY=',
    reverse: 'KT8FbMVkWahCZDyOTMw47+ajO/uwQXLIaOQHQF3FVsY=',
    dannyridel: 'KT8FbMVkWahCZDyOTMw47+ajO/uwQXLIaOQHQF3FVsY=',
    DanDan0101: 'KT8FbMVkWahCZDyOTMw47+ajO/uwQXLIaOQHQF3FVsY=',
    abcisosm5: 'KT8FbMVkWahCZDyOTMw47+ajO/uwQXLIaOQHQF3FVsY=',
    rbald02: 'KT8FbMVkWahCZDyOTMw47+ajO/uwQXLIaOQHQF3FVsY=',
    somath: 'KT8FbMVkWahCZDyOTMw47+ajO/uwQXLIaOQHQF3FVsY=',
    APandasBamboo: 'KT8FbMVkWahCZDyOTMw47+ajO/uwQXLIaOQHQF3FVsY=',
    gorilla97: 'KT8FbMVkWahCZDyOTMw47+ajO/uwQXLIaOQHQF3FVsY=',
    HA: 'KT8FbMVkWahCZDyOTMw47+ajO/uwQXLIaOQHQF3FVsY=',
    DanZ137: 'KT8FbMVkWahCZDyOTMw47+ajO/uwQXLIaOQHQF3FVsY=',
    mmoz999: 'KT8FbMVkWahCZDyOTMw47+ajO/uwQXLIaOQHQF3FVsY=',
    MangoPotato: 'KT8FbMVkWahCZDyOTMw47+ajO/uwQXLIaOQHQF3FVsY=',
    steviewonder24 : 'KT8FbMVkWahCZDyOTMw47+ajO/uwQXLIaOQHQF3FVsY=',
    yabioboi: 'KT8FbMVkWahCZDyOTMw47+ajO/uwQXLIaOQHQF3FVsY=',
    DannyKoz: 'KT8FbMVkWahCZDyOTMw47+ajO/uwQXLIaOQHQF3FVsY=',
    earthman: 'KT8FbMVkWahCZDyOTMw47+ajO/uwQXLIaOQHQF3FVsY=',
    devansh: 'KT8FbMVkWahCZDyOTMw47+ajO/uwQXLIaOQHQF3FVsY=',
    Aachen: 'KT8FbMVkWahCZDyOTMw47+ajO/uwQXLIaOQHQF3FVsY=',
    mason: 'KT8FbMVkWahCZDyOTMw47+ajO/uwQXLIaOQHQF3FVsY=',
    'dan.k.memes': 'KT8FbMVkWahCZDyOTMw47+ajO/uwQXLIaOQHQF3FVsY=',
    jasmine: 'KT8FbMVkWahCZDyOTMw47+ajO/uwQXLIaOQHQF3FVsY=',
    bombadil: 'KT8FbMVkWahCZDyOTMw47+ajO/uwQXLIaOQHQF3FVsY=',
    aastha: 'KT8FbMVkWahCZDyOTMw47+ajO/uwQXLIaOQHQF3FVsY=',
    'nipu d': 'KT8FbMVkWahCZDyOTMw47+ajO/uwQXLIaOQHQF3FVsY=',
    ThyOwnBoy: 'KT8FbMVkWahCZDyOTMw47+ajO/uwQXLIaOQHQF3FVsY=',
}


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
function checkCredentials(username, password) {
    return passwords[username] === saltAndHashPassword(password);
}

/**
 * Checks that the token is valid and stores the corrent username.
 * `checkToken` guarantees that the username is in the database if the token is valid.
 * @param {String} username 
 * @param {String} token 
 * @returns 
 */
function checkToken(username, token) {
    return jwt.verify(token, secret, function (err, decoded) {
        if (err) {
            return false;
        } else {
            return decoded.username === username && username in passwords;
        }
    });
}

/**
 * Creates a new set of credentials with the given username and password.
 * `password` should be UNHASHED; the function will call `hashPassword` to hash it.
 * @param {String} username 
 * @param {String} password 
 */
function addCredentials(username, password) {
    passwords[username] = hashPassword(password);
}

/**
 * 
 * @param {String} username 
 * @returns A JWT token.
 */
function generateToken(username) {
    return jwt.sign({ username: username }, secret);
}

module.exports = {
    checkCredentials, checkToken, addCredentials, generateToken
};