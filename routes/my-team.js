var authentication = require('../authentication');
var database = require('../database');
var express = require('express');
var router = express.Router();

router.get('/', async function (req, res, next) {
    let username = req.session.username;
    if (authentication.checkToken(username, req.session.token)) {
        let user = await database.getUser(username);
        if (user && user.role == 'GM') {
            let team = await database.getTeam({name: user.team});
            let playerIds = team.players;
            let players = [];
            for (let id in playerIds) {
                let player = await database.getUserById(playerIds[id]);
                players.push(player);
            }
            if (team) {
                res.render('my-team', {
                    title: 'My Team',
                    players: players,
                    picks: team.draft_picks,
                    user: user,
                    username: req.session.username,
                    team: team
                });

                return;
            }
        }
    }

    res.render('my-team', {
        title: 'NSBA',
        username: req.session.username
    });
});

module.exports = router;
