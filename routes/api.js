var express = require('express');
var router = express.Router();
var database = require('../database.js');

router.post('/', function (req, res, next) {
    console.log(req.body);
    next();
});

router.post('/login', function (req, res, next) {
    console.log(req.body);
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
        console.log(req.body);
        database.addPlayer(req.body.username, req.body);
        res.sendStatus(200);
    }
});



module.exports = router;