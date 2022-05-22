var express = require('express');
var router = express.Router();

var authentication = require('../authentication');
var database = require('../database');

router.use(function (req, res, next) {
    next();
});

router.post('/login', async (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;
    if (await authentication.checkPassword(username, password)) {
        req.session.username = username;
        let user = await database.getUser(username);
        req.session.token = authentication.generateToken(username, user.role);
        res.sendStatus(200);
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
        req.session.username = username;
        req.session.token = authentication.generateToken(username);

        // req.body.role = 'Player';
        req.body.password = authentication.saltAndHashPassword(req.body.password);
        await database.addUser(username, req.body);
        res.sendStatus(200);
    }
});

router.post('/create-team', async (req, res, next) => {
    let username = req.session.username;
    let token = req.session.token;
    if (await authentication.checkToken(username, token)) {
        let user = await database.getUser(username);
        if (user.role == 'GM') {
            database.createTeam(username);
            res.sendStatus(200);
        } else {
            res.sendStatus(401);
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
        if (username != req.body.username)
            req.session = null;

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
            await authentication.updatePassword(username, 'password', req.body.newPassword);
            res.sendStatus(200);
        } else {
            res.sendStatus(403);
        }
    } else {
        res.sendStatus(401);
    }
});

module.exports = router;