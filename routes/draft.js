var express = require('express');
var router = express.Router();

var database = require('../database');

router.get('/', function (req, res, next) {
    res.render('draft', {
        title: 'Draft',
        gms: database.getGMs(),
        players: database.getPlayers(),
        username: req.session.username
    });
});

module.exports = router;
