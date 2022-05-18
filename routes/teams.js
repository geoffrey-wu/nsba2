var express = require('express');
var database = require('../database');
var router = express.Router();

router.get('/', async (req, res, next) => {
    res.render('teams', { 
        title: 'Teams',
        teams: await database.getTeams(),
        username: req.session.username
    });
});

module.exports = router;
