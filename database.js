const { MongoClient } = require('mongodb');
const uri = `mongodb+srv://geoffreywu42:${process.env.MONGODB_PASSWORD ? process.env.MONGODB_PASSWORD : 'LFsAjFrEPrn1fSqa'}@nsba.ujpbt.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri);
client.connect();

const database = client.db('nsba');
const users = database.collection('users');
const teams = database.collection('teams');

async function getGM(username) {
    return await getUser(username, role = 'GM');
}

async function getPlayer(username) {
    return await getUser(username, role = 'Player');
}

/**
 * 
 * @param {String} username the username of the user you are trying to retrieve.
 * @param {String} role (optional) the role of the user. Must be either 'player', 'GM', or 'Admin'.
 * @returns JSON-like user object matching the parameters. Returns undefined if no users match the query.
 */
async function getUser(username, role = '') {
    let query = { username: username };
    if (role) {
        query['role'] = role;
    }

    return await users.findOne(query);
}

async function getGMs() {
    return await getUsers(role = 'GM');
}

async function getPlayers() {
    return await getUsers(role = 'Player');
}

async function getUsers(role = '') {
    let query = {};
    if (role) {
        query['role'] = role;
    }
    const cursor = await users.find(query);
    return cursor.toArray();
}

async function getTeams() {
    const query = {};
    const cursor = await teams.find(query);
    return cursor.toArray();
}

/**
 * Adds the player to the database. Throws an error if the player is already in the database.
 * @param {String} playerName
 * @param {JSON} player 
 * 
 */
async function addUser(playerName, player) {
    player['_id'] = playerName;
    player['username'] = playerName;
    if (!(role in player)) {
        player['role'] = 'Player';
    }

    const result = await users.insertOne(player);

    return result;
}

/**
 * 
 * @param {String} username
 * @param {String} key 
 * @param {String} value 
 */
async function editAttribute(username, key, value) {
    const filter = { username: username };
    let tempJSON = {};
    tempJSON[key] = value;
    const update = { $set: tempJSON };
    await users.updateOne(filter, update);
}

/**
 * Edit multiple attributes of a user at one time.
 * @param {String} username 
 * @param {JSON} newAttributes - the attributes to be added or modified to the user.
 */
async function editAttributes(username, newAttributes) {
    const filter = { username: username };
    const update = { $set: newAttributes };
    await users.updateOne(filter, update);
}


/**
 * Finds and replaces user with given `username` with `newUser`.
 * If `username` does not exist, adds `newUser` to database.
 * 
 * If you want to edit attributes, use `editAttribute` instead.
 * This function will delete all existing fields, even if there is no corresponding field to replace it with.
 * @param {String} username 
 * @param {JSON} newUser 
 */
async function replaceUser(username, newUser) {
    const query = { username: username };
    const result = await users.replaceOne(query, newUser);
}

module.exports = {
    getGM, getGMs, getPlayer, getPlayers, getUser, getUsers, getTeams, addUser, editAttribute, editAttributes, replaceUser
};