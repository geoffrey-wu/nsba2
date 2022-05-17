var express = require('express');
var router = express.Router();
var database = require('../database.js');

router.use(function (req, res, next) {
    console.log(req.body);
    next();
});

router.post('/login', function (req, res, next) {
    let users = database.getPlayers();
    if (req.body.username in users && users[req.body.username]['password'] === req.body.password) {
        res.sendStatus(200);
    } else {
        res.sendStatus(401);
    }
});

router.post('/signup', (req, res, next) => {
    // username already exists
    if (req.body.username in database.getPlayers()) {
        res.sendStatus(409);
    } else {
        database.addPlayer(req.body.username, req.body);
        res.sendStatus(200);
    }
});

router.post('/edit-profile', (req, res, next) => {
    // username already exists
    if (!(req.body.username in database.getPlayers())) {
        res.sendStatus(401);
    } else {
        let password = database.getPlayer(req.body.username)['password'];
        req.body.password = password;
        database.addPlayer(req.body.username, req.body);
        res.sendStatus(200);
    }
});

router.post('/edit-bio', (req, res, next) => {
    if (req.body.username in database.getPlayers()) {
        database.editAttribute(req.body.username, 'bio', req.body.bio);
        res.sendStatus(200);
    } else {
        res.sendStatus(401);
    }
});

module.exports = router;