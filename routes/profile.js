var express = require('express');
var database = require('../database');
var router = express.Router();

router.get(/\/.+/, function (req, res, next) {
    let username = req.url.substring(1);
    if (username.charAt(username.length - 1) === '/') {
        username = username.substring(0, username.length - 1);
    }
    let player = database.getPlayer(username);
    let gm = database.getGM(username);
    if (player) {
        res.render('profile', {
            title: username,
            role: 'Player',
            user: player
        });
    } else if (gm) {
        res.render('profile', {
            title: username,
            role: 'GM',
            user: gm
        });
    } else {
        res.status(404).render('error', {
            message: 'Player not found',
            error: {
                status: 404,
                stack: req.url
            }
        });
    }
});

router.get('/', function (req, res, next) {
    res.redirect('/');
});

module.exports = router;
