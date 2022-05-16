var express = require('express');
var database = require('../database');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('draft', {
        title: 'Draft',
        gms: database.getGMs(),
        players: database.getPlayers(),
    });
});

module.exports = router;
