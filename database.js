if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const { MongoClient, ObjectId } = require('mongodb');
const uri = `mongodb+srv://geoffreywu42:${process.env.MONGODB_PASSWORD ? process.env.MONGODB_PASSWORD : 'password'}@nsba.ujpbt.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri);
client.connect().then(() => {
    console.log('connected to mongodb');
});

const database = client.db('nsba');
const draft = database.collection('draft');
const mockDraft = database.collection('mock-draft');
const schedule = database.collection('schedule');
const teams = database.collection('teams');
const users = database.collection('users');
const results = database.collection('results');

/**
 * 
 * @param {String} username the username of the user you are trying to retrieve.
 * @param {String} role the role of the user. Must be either 'player', 'GM', or 'Admin'.
 * @returns {Promise<JSON>} JSON-like user object matching the parameters. Returns undefined if no users match the query.
 */
async function getUser(username, role = '') {
    let query = { username: username };
    if (role) {
        query['role'] = role;
    }

    return await users.findOne(query);
}

/**
 * Finds and returns the user with the given id.
 * If no user is found, returns `null`.
 * @param {String} id 
 * @returns <Promise<JSON>> - JSON-like user object.
 */
async function getUserById(id) {
    const query = { _id: id };
    return await users.findOne(query);
}

/**
 * Returns an array of all users.
 * @param {String} role - if specified, only get users with this role.
 * @returns Array of JSON-like user objects.
 */
async function getUsers(role = '') {
    let query = {};
    if (role) {
        query['role'] = role;
    }
    const cursor = await users.find(query);
    return cursor.toArray();
}

/**
 * Returns the team with the given name.
 * Returns null if no results are found.
 * @param {String} name
 * @returns {Promise<JSON>} JSON-like team object.
 */
async function getTeam(name) {
    const query = { name: name };
    return await teams.findOne(query);
}

/**
 * For each given team id in the array `ids`, returns the corresponding team name.
 * @param {Array<String>} ids
 * @returns {Promise<Array<String>>} an array of team names.
 */
async function getTeamNames(ids) {
    let names = [];
    for (let i = 0; i < ids.length; i++) {
        const team = await teams.findOne({ _id: ids[i] }, { projection: { name: 1 } });
        names.push(team.name);
    }

    return names;
}

/**
 * Finds and returns all teams in database.
 * @returns {Promise<Array<JSON>>} - an array of JSON-like team objects.
 */
async function getTeams() {
    const cursor = await teams.find({});
    return cursor.toArray();
}

/**
 * Returns an array of week objects.
 * Guaranteed to be sorted by week, starting from week 1.
 * @returns {Promise<JSON>}
 */
async function getSchedule() {
    return await schedule.find({}, { sort: { week: 1 } }).toArray();
}

async function getResults() {
    return await results.find({}, { sort: { week: -1, _id: 1 } }).toArray();
}

/**
 * Returns the results of the mock draft.
 * The results are *in order*, so the i-th element of the array corresponds to the i-th pick.
 * @returns {Promise<Array<JSON>>} an array of JSON-like player objects.
 */
async function getMockDraft() {
    let mock = await mockDraft.find({}, { sort: { _id: 1 } }).toArray();
    let players = await users.find({ role: 'Player' }).toArray();
    let results = [];

    for (let index in mock) {
        let id = mock[index].player_id;
        results.push(players.filter(player => player._id === id)[0]);
    }

    return results;
}

/**
 * Returns the result of the actual draft in an array.
 * @returns {Promise<Array<JSON>>} an array of JSON-like draft objects.
 */
async function getDraft() {
    return await draft.find({ _id: { $gte: 0 } }, { sort: { _id: 1 } }).toArray();
}

/**
 * 
 * @returns {Promise<Number>} 0-indexed number of the current draft pick.
 */
async function getCurrentDraftNumber() {
    let currentPick = await draft.findOne({ _id: -1 });
    return currentPick.currentPick;
}

/**
 * 
 * @param {Number} number 
 * @returns 
 */
async function getDraftPick(number) {
    return await draft.findOne({ _id: number });
}

/**
 * 
 * @returns {Promise<JSON>} JSON-like draft object.
 */
async function getPreviousDraftPick() {
    let currentPick = await draft.findOne({ _id: -1 });
    currentPick = currentPick.currentPick;
    if (currentPick - 1 >= 0) {
        return await getDraftPick(currentPick - 1);
    } else {
        return undefined;
    }
}

/**
 * 
 * @returns {Promise<JSON>} JSON-like draft object.
 */
async function getCurrentDraftPick() {
    let currentPick = await draft.findOne({ _id: -1 });
    currentPick = currentPick.currentPick;
    if (currentPick >= 0) {
        return await getDraftPick(currentPick);
    } else {
        return undefined;
    }
}

/**
 * 
 * @returns {Promise<JSON>} JSON-like draft object.
 */
async function getNextDraftPick() {
    let currentPick = await draft.findOne({ _id: -1 });
    currentPick = currentPick.currentPick;
    if (currentPick + 1 >= 0) {
        return await getDraftPick(currentPick + 1);
    } else {
        return undefined;
    }
}

/**
 * 
 * @param {String} playerName - the name of the player that was drafted.
 */
async function draftPlayer(playerName, teamName) {
    let player = await users.findOneAndUpdate({ username: playerName }, { $set: { team: teamName } });
    player = player.value;
    let draftNumber = await draft.findOne({ _id: -1 });
    draftNumber = draftNumber.currentPick;
    await draft.updateOne({ _id: parseInt(draftNumber) }, { $set: { player: playerName } });
    await draft.updateOne({ _id: -1 }, { $inc: { currentPick: 1 } });

    await teams.updateOne({ name: teamName }, { $push: { player_ids: player._id } });
}

async function getCombine() {
    let combine = await users.find({ role: 'Player' }, { projection: { username: 1, combine: 1 } }).toArray();
}

/**
 * Adds the player to the database. Throws an error if the player is already in the database.
 * @param {String} username - the username of the player to be added.
 * @param {JSON} user - JSON object to be added to the database.
 */
async function createUser(username, user) {
    user['_id'] = (new ObjectId()).toString();
    user['username'] = username;
    if (!(role in user)) {
        user['role'] = 'Player';
    }

    await users.insertOne(user);
}

/**
 * Creates a new team and adds it to the database.
 * Modifies the GM object with given `username` to include the new team.
 * @param {String} username
 * @returns {void}
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

async function addResult(result) {
    await results.insertOne(result);
}

/**
 * Sets field `key` to value `value` of user with username `username`.
 * Does nothing if `username` is not found.
 * @param {String} username
 * @param {JSON} newValues
 */
async function updateUser(username, newValues) {
    const filter = { username: username };
    await users.updateOne(filter, { $set: newValues });

    if ('username' in newValues && newValues['username'] !== username) {
        let user = await getUser(newValues['username']);
        if (user.role === 'GM') {
            await updateTeam(user.team, { gm: newValues['username'] });
            await draft.updateMany({ gm: username }, { $set: { gm: newValues['username'] } });
        } else if ('team' in user) {
            await draft.updateOne({ player: username }, { $set: { player: newValues['username'] } });
            await teams.updateMany({}, { $set: { 'players.$[oldName]': newValues['username'] } }, { arrayFilters: [{ oldName: username }] });
            let tempOldHome = 'home.players.' + username;
            let tempOldAway = 'away.players.' + username;
            let tempNewHome = 'home.players.' + newValues['username'];
            let tempNewAway = 'away.players.' + newValues['username'];
            let renameObject = {};
            renameObject[tempOldHome] = tempNewHome;
            renameObject[tempOldAway] = tempNewAway;
            await results.updateMany({}, {
                $rename: renameObject
            })
        }
    }
}

/**
 * Updates team with the given `teamName` by setting the value of `key` to `value`.
 * This method guarantees consistency throughout the database if the team name changes.
 * @param {String} teamName 
 * @param {JSON} newValues
 */
async function updateTeam(teamName, newValues) {
    const filter = { name: teamName };
    await teams.updateOne(filter, { $set: newValues });

    if ('name' in newValues && teamName !== newValues.name) {
        schedule.updateMany({}, { $set: { "matchups.$[].$[oldName]": newValues['name'] } }, { arrayFilters: [{ oldName: teamName }] })
        await
            Many({ team: teamName }, { team: newValues['name'] });
        await users.updateMany({ team: teamName }, { $set: { team: newValues['name'] } });
    }
}

/**
 * Finds and replaces user with given `username` with `newUser`.
 * If `username` does not exist, adds `newUser` to database.
 * 
 * If you want to edit attributes, use `updateUser` or `updateUsers` instead.
 * This function will delete all existing fields, even if there is no corresponding field to replace it with.
 * @param {String} username 
 * @param {JSON} newUser 
 */
async function replaceUser(username, newUser) {
    const query = { username: username };
    const result = await users.replaceOne(query, newUser);
}

module.exports = {
    getUser, getUserById, getUsers, getTeam, getTeams, getTeamNames, getSchedule, getResults, getCombine,
    createUser, createTeam, addResult, updateUser, updateTeam, replaceUser,
    getMockDraft, getDraft, getCurrentDraftNumber, getDraftPick, getPreviousDraftPick, getCurrentDraftPick, getNextDraftPick, draftPlayer
};

