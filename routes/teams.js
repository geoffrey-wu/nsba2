var express = require('express');
var database = require('../database');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('teams', { 
        title: 'Teams',
        teams: database.getTeams()
    });
});

module.exports = router;
