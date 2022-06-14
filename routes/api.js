var express = require('express');
var router = express.Router();

// var io = require('../bin/www');

var authentication = require('../authentication');
var database = require('../database');


router.post('/login', async (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;
    if (await authentication.checkPassword(username, password)) {
        req.session.username = username;
        req.session.token = authentication.generateToken(username);
        res.sendStatus(200);
        return;
    } else {
        res.sendStatus(401);
    }
});

router.post('/logout', (req, res, next) => {
    req.session = null;
    res.sendStatus(200);
});

router.post('/signup', async (req, res, next) => {
    let username = req.body.username;

    // return error if username already exists
    let results = await database.getPlayer(username);
    if (results) {
        res.sendStatus(409);
    } else {
        // log the user in when they sign up
        req.session.username = username;
        req.session.token = authentication.generateToken(username);
    
        req.body.password = authentication.saltAndHashPassword(req.body.password);
        await database.addUser(username, req.body);
        res.sendStatus(200);
    }
});

router.post('/create-team', async (req, res, next) => {
    let username = req.session.username;
    let token = req.session.token;
    if (authentication.checkToken(username, token)) {
        let user = await database.getUser(username);
        if (user.role == 'GM') {
            database.createTeam(username);
            res.sendStatus(200);
        } else {
            res.sendStatus(403);
        }
    } else {
        res.sendStatus(401);
    }
});

router.post('/edit-profile', async (req, res, next) => {
    let username = req.session.username;
    let token = req.session.token;
    if (authentication.checkToken(username, token)) {
        // log out if player changed their username
        // and change team.gm to new username
        if (username != req.body.username) {
            req.session = null;
            let user = await database.getUser(username);
            if (user && user.role === 'GM') { // check if user is GM
                await database.editTeamAttribute(user.team, 'gm', req.body.username);
                await database.editDraftAttribute(user.team, 'gm', req.body.username);
            } else if (user && 'team' in user) {
                await database.editDraftAttribute(user.team, 'player', req.body.username);
            }
        }

        delete req.body.discord;
        delete req.body.role;
        delete req.body.password;

        await database.editAttributes(username, req.body);
        res.sendStatus(200);
    } else {
        res.sendStatus(401);
    }
});

router.post('/edit-bio', async (req, res, next) => {
    let username = req.session.username;
    let token = req.session.token;
    if (authentication.checkToken(username, token)) {
        await database.editAttribute(username, 'bio', req.body.bio);
        res.sendStatus(200);
    } else {
        res.sendStatus(401);
    }
});

router.post('/edit-password', async (req, res, next) => {
    let username = req.session.username;
    let token = req.session.token;
    if (authentication.checkToken(username, token)) {
        if (await authentication.checkPassword(username, req.body.oldPassword)) {
            await authentication.updatePassword(username, req.body.newPassword);
            res.sendStatus(200);
        } else {
            res.sendStatus(403);
        }
    } else {
        res.sendStatus(401);
    }
});

router.post('/edit-team-name', async (req, res, next) => {
    let username = req.session.username;
    let token = req.session.token;
    if (authentication.checkToken(username, token)) {
        let user = await database.getUser(username);
        if (user.role == 'GM') {
            await database.editAttribute(username, 'team', req.body.newName);
            await database.editTeamAttribute(user.team, 'name', req.body.newName);
            await database.editDraftAttribute(user.team, 'team', req.body.newName);
            res.sendStatus(200);
        } else {
            res.sendStatus(403);
        }
    } else {
        res.sendStatus(401);
    } 
});

router.post('/draft-player', async (req, res, next) => {
    let username = req.session.username;
    let token = req.session.token;
    if (authentication.checkToken(username, token)) {
        let user = await database.getGM(username);
        if (user && 'team' in user) {
            let team = await database.getTeam(user.team);
            if (team.draft_picks.includes(await database.getCurrentDraftNumber())) {
                await database.draftPlayer(req.body.player, team.name);
                let nextDraftPick = await database.getNextDraftPick();
                res.status(200).send({nextGm: nextDraftPick.gm, nextTeam: nextDraftPick.team, player: req.body.player});
            } else {
                res.sendStatus(403);
            }
        } else {
            res.sendStatus(403);
        }
    } else {
        res.sendStatus(401);
    }
});

router.post('/add-result', async (req, res, next) => {
    let username = req.session.username;
    let token = req.session.token;
    if (authentication.checkToken(username, token)) {
        let user = await database.getUser(username);
        if (user.role === 'Admin') {
            await database.addResult(req.body.result);
            res.sendStatus(200);
        } else {
            res.sendStatus(403);
        }
    } else {
        res.sendStatus(401);
    }
})

module.exports = router;