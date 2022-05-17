var express = require('express');
var database = require('../database');
var router = express.Router();

router.get(/\/.+/, function (req, res, next) {
    let gmName = req.url.substring(1);
    if (gmName.charAt(gmName.length - 1) === '/') {
        gmName = gmName.substring(0, gmName.length - 1);
    }
    let gm = database.getGM(gmName);
    if (gm) {
        res.render('user', {
            title: gmName,
            role: 'GM',
            user: gm,
            username: req.session.username
        });
    } else {
        res.status(404).render('error', {
            message: 'GM not found',
            error: {
                status: 404,
                stack: req.url
            }
        });
    }
});

router.get('/', function (req, res, next) {
    res.render('users',
        {
            description: 'A General Manager (GM) is responsible for managing a team, performing trades, and drafting a player. They do not play in games.',
            title: 'GMs',
            role: 'GM',
            users: database.getGMs(),
            username: req.session.username
        }
    );
});

module.exports = router;
