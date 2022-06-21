var express = require('express');
var router = express.Router();

var database = require('../database');

/* GET home page. */
router.get('/', async (req, res, next) => {
    res.render('standings', {
        title: 'Standings',
        username: req.session.username,

        teams: await database.getTeams(sort = {'stats.record.0': -1, 'stats.points': -1})
    });
});

module.exports = router;
