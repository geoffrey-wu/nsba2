var express = require('express');
var router = express.Router();

var database = require('../database');

/* GET home page. */
router.get('/leaderboard', async (req, res, next) => {
    res.render('rr/leaderboard', {
        title: 'Leaderboard',
        username: req.session.username,

        players: await database.getUsers(role = 'Player', {picture: 0}, {'stats.ppg': -1, 'stats.pp22': -1, 'stats.gp': -1, 'stats.tuh': -1, 'stats.statline.0': -1, 'stats.statline.1': -1})
    });
});

router.get('/pickem', (req, res, next) => {
    res.render('rr/pickem', {
        title: 'NSBA',
        username: req.session.username
    });
});

router.get('/results', async (req, res, next) => {
    res.render('rr/results', { 
        title: 'Results',
        username: req.session.username,

        results: await database.getResults(),
        schedule: await database.getSchedule(),
        teams: await database.getTeams(),
        user: await database.getUser(req.session.username)
    });
});

/* GET home page. */
router.get('/schedule', async (req, res, next) => {
    res.render('rr/schedule', {
        title: 'NSBA',
        username: req.session.username,

        schedule: await database.getSchedule()
    });
});

/* GET home page. */
router.get('/standings', async (req, res, next) => {
    res.render('rr/standings', {
        title: 'Standings',
        username: req.session.username,

        teams: await database.getTeams(sort = {'stats.record.0': -1, 'stats.record.1': 1, 'stats.points': -1})
    });
});

router.get('/vods', (req, res, next) => {
    res.render('rr/vods', {
        title: 'NSBA',
        username: req.session.username
    });
});

module.exports = router;
