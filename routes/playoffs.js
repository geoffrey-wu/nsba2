var express = require('express');
var router = express.Router();

var database = require('../database');

router.get('/results', async (req, res, next) => {
    res.render('playoffs/results', {
        title: 'NSBA',
        username: req.session.username,

        results: await database.getResults(),
        schedule: await database.getSchedule(),
        teams: await database.getTeams(),
        user: await database.getUser(req.session.username)
    });
});

router.get('/schedule', async (req, res, next) => {
    res.render('playoffs/schedule', {
        title: 'NSBA',
        username: req.session.username,

        schedule: await database.getSchedule()
    });
});

router.get('/vods', async (req, res, next) => {
    res.render('playoffs/vods', {
        title: 'NSBA',
        username: req.session.username
    });
});

module.exports = router;
