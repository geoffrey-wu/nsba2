var express = require('express');
var database = require('../database');
var router = express.Router();

router.get('/', async (req, res, next) => {
    res.render('draft-order', { 
        title: 'Draft Order',
        teams: await database.getTeams(),
        username: req.session.username
    });
});

module.exports = router;
