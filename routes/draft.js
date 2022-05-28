var express = require('express');
var router = express.Router();

var database = require('../database');

router.get('/', async (req, res, next) => {
    res.render('draft', {
        title: 'Draft',
        username: req.session.username,

        previousPick: await database.getPreviousDraftPick(),
        currentPick: await database.getCurrentDraftPick(),
        nextPick: await database.getNextDraftPick(),

        picks: await database.getDraft(),
        players: await database.getPlayers(),
    });
});

module.exports = router;
