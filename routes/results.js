var express = require('express');
var router = express.Router();

var database = require('../database');

router.get('/', async (req, res, next) => {
    res.render('results', { 
        title: 'Results',
        username: req.session.username,

        results: await database.getResults(),
        schedule: await database.getSchedule(),
        teams: await database.getTeams(),
        user: await database.getUser(req.session.username)
    });
});

module.exports = router;
