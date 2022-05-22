var express = require('express');
var router = express.Router();

var database = require('../database');

router.get(/\/.+/, async (req, res, next) => {
    let playerName = decodeURI(req.url.substring(1));
    if (playerName.charAt(playerName.length - 1) === '/')
        playerName = playerName.substring(0, playerName.length - 1);

    let player = await database.getPlayer(playerName);
    if (player) {
        res.render('user', {
            title: playerName,
            username: req.session.username,

            user: player
        });

        return;
    }

    res.status(404).render('error', {
        message: 'Player not found',
        error: {
            status: 404,
            stack: req.url
        }
    });
});

router.get('/', async (req, res, next) => {
    res.render('users', {
        description: 'Players compete in science bowl games. They can be traded and drafted.',
        title: 'players',
        role: 'player',
        users: await database.getPlayers(),
        username: req.session.username
    });
});



module.exports = router;
