var express = require('express');
var router = express.Router();
var createError = require('http-errors');

var database = require('../database');

router.get(/\/.+/, async (req, res, next) => {
    let playerName = decodeURI(req.url.substring(1));
    if (playerName.charAt(playerName.length - 1) === '/')
        playerName = playerName.substring(0, playerName.length - 1);

    let player = await database.getUser(playerName, role = 'Player');
    if (player) {
        res.render('user', {
            title: playerName,
            username: req.session.username,

            results: await database.getResults(),
            user: player
        });
    } else {
        next(createError(404));
    }
});

router.get('/', async (req, res, next) => {
    res.render('users', {
        title: 'Players',
        username: req.session.username,

        description: 'Players compete in science bowl games. They can be traded and drafted.',
        role: 'player',
        users: await database.getUsers(role = 'Player'),
    });
});



module.exports = router;
