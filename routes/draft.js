var express = require('express');
var router = express.Router();

var database = require('../database');

router.get('/', async (req, res, next) => {
    res.render('draft', {
        title: 'Draft',
        gms: await database.getGMs(),
        players: await database.getPlayers(),
        username: req.session.username
    });
});

module.exports = router;
