var express = require('express');
var router = express.Router();

var database = require('../database');

router.get('/bracket', async (req, res, next) => {
    res.render('playoffs/bracket', {
        title: 'NSBA',
        username: req.session.username,
    });
});

router.get('/vods', async (req, res, next) => {
    res.render('playoffs/vods', {
        title: 'NSBA',
        username: req.session.username
    });
});

module.exports = router;
