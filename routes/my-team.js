var express = require('express');
var router = express.Router();

var authentication = require('../authentication');
var database = require('../database');

router.get('/', async (req, res, next) => {
    let username = req.session.username;
    let token = req.session.token;
    if (authentication.checkToken(username, token)) {
        let user = await database.getUser(username);
        if (user && user.role == 'GM') {
            let team = await database.getTeam(user.team);
            let playerIds = team.player_ids;
            let players = [];
            for (let id in playerIds) {
                let player = await database.getUserById(playerIds[id]);
                players.push(player);
            }
            if (team) {
                res.render('my-team', {
                    title: 'My Team',
                    username: req.session.username,
                    
                    picks: team.draft_picks,
                    players: players,
                    team: team,
                    user: user
                });

                return;
            }
        }
    }

    res.render('my-team', {
        user: {},
        title: 'my-team',
        team: {},
        username: req.session.username
    });
});

module.exports = router;
