var express = require('express');
var router = express.Router();

var database = require('../database');

/* GET home page. */
router.get('/', async (req, res, next) => {
    res.render('leaderboard', {
        title: 'Leaderboard',
        username: req.session.username,

        players: await database.getUsers(role = 'Player', {picture: 0}, {'stats.ppg': -1, 'stats.pp22': -1, 'stats.gp': -1, 'stats.tuh': -1, 'stats.statline.0': -1, 'stats.statline.1': -1})
    });
});

module.exports = router;
