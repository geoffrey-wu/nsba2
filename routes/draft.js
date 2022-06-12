var express = require('express');
var router = express.Router();

var database = require('../database');

router.get('/', async (req, res, next) => {
    res.render('draft', {
        title: 'Draft',
        username: req.session.username,

        picks: await database.getDraft(),
        players: await database.getPlayers(),
    });
});

module.exports = router;
