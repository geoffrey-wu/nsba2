var express = require('express');
var router = express.Router();

var authentication = require('../authentication');
var database = require('../database');

router.use(function (req, res, next) {
    if (req.body.password) {
        console.log('{ username: \'' + req.body.username + '\' }');
    } else {
        console.log(req.body);
    }
    next();
});

router.post('/login', function (req, res, next) {
    let username = req.body.username;
    let password = req.body.password;
    if (authentication.checkCredentials(username, password)) {
        req.session.username = username;
        req.session.token = authentication.generateToken(username);
        res.sendStatus(200);
    } else {
        res.sendStatus(401);
    }
});

router.post('/logout', (req, res, next) => {
    req.session = null;
    res.sendStatus(200);
});

router.post('/signup', (req, res, next) => {
    let username = req.body.username;

    // return error if username already exists
    if (username in database.getPlayers()) {
        res.sendStatus(409);
    } else {
        authentication.addCredentials(username, req.body.password);
        req.session.username = username;
        req.session.token = authentication.generateToken(username);

        delete req.body.password;
        database.addPlayer(username, req.body);
        res.sendStatus(200);
    }
});

router.post('/edit-profile', (req, res, next) => {
    let username = req.session.username;
    let token = req.session.token;
    if (authentication.checkToken(username, token)) {
        let password = database.getPlayer(username)['password'];
        req.body.password = password;
        database.addPlayer(username, req.body);
        res.sendStatus(200);
    } else {
        res.sendStatus(401);
    }
});

router.post('/edit-bio', (req, res, next) => {
    let username = req.session.username;
    let token = req.session.token;
    if (authentication.checkToken(username, token)) {
        database.editAttribute(username, 'bio', req.body.bio);
        res.sendStatus(200);
    } else {
        res.sendStatus(401);
    }
});

module.exports = router;