if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const { MongoClient, ObjectId } = require('mongodb');
const uri = `mongodb+srv://geoffreywu42:${process.env.MONGODB_PASSWORD ? process.env.MONGODB_PASSWORD : 'password'}@nsba.ujpbt.mongodb.net/?retryWrites=true&w=majority`;

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

async function getUserById(id) {
    const query = { _id: id };
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

/**
 * 
 * @param {JSON} query 
 * @returns 
 */
async function getTeam(query) {
    // const query = { _id: id };
    return await teams.findOne(query);
}

/**
 * 
 * @param {Array<String>} ids
 */
async function getTeamNames(ids) {
    let names = [];
    for (let i = 0; i < ids.length; i++) {
        const team = await teams.findOne({ _id: ids[i] }, { projection: { name: 1 } });
        names.push(team.name);
    }

    return names;
}

async function getTeams() {
    const query = {};
    const cursor = await teams.find(query);
    return cursor.toArray();
}

/**
 * Adds the player to the database. Throws an error if the player is already in the database.
 * @param {String} username - the username of the player to be added.
 * @param {JSON} player - the player to be added to the database.
 */
async function addUser(username, player) {
    player['_id'] = (new ObjectId()).toString();
    player['username'] = username;
    if (!(role in player)) {
        player['role'] = 'Player';
    }

    await users.insertOne(player);
}

/**
 * Creates a new team, adds it to the database, and modifies the GM object to include the new team.
 * @param {String} username
 */
async function createTeam(username) {
    const team = {
        _id: (new ObjectId()).toString(),
        gm: username,
        name: username,
        player_ids: [],
        draft_picks: [],
    };
    await teams.insertOne(team);

    const filter = { username: username };
    const update = { $set: { team: username } };
    await users.updateOne(filter, update);
}

/**
 * Sets field `key` to value `value` of user with username `username`.
 * Does nothing if `username` is not found.
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
 * 
 * @param {String} teamName 
 * @param {String} key 
 * @param {String} value 
 */
async function editTeamAttribute(teamName, key, value) {
    const filter = { name: teamName };
    let tempJSON = {};
    tempJSON[key] = value;
    const update = { $set: tempJSON };
    await teams.updateOne(filter, update);
}

/**
 * Edit multiple attributes of a user at one time.
 * Does nothing if `username` is not found.
 * @param {String} username 
 * @param {JSON} newAttributes - the attributes to be added or modified to the user in {field, value} pairs.
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
 * If you want to edit attributes, use `editAttribute` or `editAttributes` instead.
 * This function will delete all existing fields, even if there is no corresponding field to replace it with.
 * @param {String} username 
 * @param {JSON} newUser 
 */
async function replaceUser(username, newUser) {
    const query = { username: username };
    const result = await users.replaceOne(query, newUser);
}

module.exports = {
    getGM, getGMs, getPlayer, getPlayers, getUser, getUserById, getUsers, getTeam, getTeams, getTeamNames,
    addUser, createTeam, editAttribute, editTeamAttribute, editAttributes, replaceUser
};

