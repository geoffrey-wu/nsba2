var express = require('express');
var router = express.Router();

var database = require('../database');

/* GET home page. */
router.get('/', async (req, res, next) => {
    res.render('leaderboard', {
        title: 'Leaderboard',
        username: req.session.username,

        players: await database.getUsers(role = 'Player', {picture: 0}, {'stats.points': -1, 'stats.gp': -1, 'stats.tuh': 1})
    });
});

module.exports = router;
