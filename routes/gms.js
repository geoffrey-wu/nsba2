var express = require('express');
var router = express.Router();
var createError = require('http-errors');

var database = require('../database');

router.get(/\/.+/, async (req, res, next) => {
    let gmName = decodeURI(req.url.substring(1));
    if (gmName.charAt(gmName.length - 1) === '/')
        gmName = gmName.substring(0, gmName.length - 1);

    let gm = await database.getUser(gmName, role = 'GM', project = {});
    if (gm) {
        res.render('user', {
            title: gmName,
            username: req.session.username,

            user: gm
        });
    } else {
        next(createError(404));
    }
});

router.get('/', async (req, res, next) => {
    res.render('users', {
        title: 'GMs',
        username: req.session.username,

        description: 'A General Manager (GM) is responsible for managing a team, performing trades, and drafting a player. They do not play in games.',
        role: 'GM',
        users: await database.getUsers(role = 'GM'),
    });
});

module.exports = router;
