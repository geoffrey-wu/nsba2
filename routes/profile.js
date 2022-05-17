var express = require('express');
var router = express.Router();

var authentication = require('../authentication');
var database = require('../database');

router.get('/', function (req, res, next) {
    let username = req.session.username;
    let token = req.session.token;
    
    if (!authentication.checkToken(username, token)) {
        res.redirect('/');
    } else {
        let player = database.getPlayer(username);
        let gm = database.getGM(username);
        if (player) {
            res.render('profile', {
                title: username,
                role: 'Player',
                user: player,
                username: req.session.username
            });
        } else if (gm) {
            res.render('profile', {
                title: username,
                role: 'GM',
                user: gm,
                username: req.session.username
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
    }
});


module.exports = router;