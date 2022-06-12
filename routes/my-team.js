var express = require('express');
var router = express.Router();
var createError = require('http-errors');

var authentication = require('../authentication');
var database = require('../database');

router.get('/', async (req, res, next) => {
    let username = req.session.username;
    let token = req.session.token;
    if (authentication.checkToken(username, token)) {
        let user = await database.getUser(username);
        if (user && user.team) {
            let team = await database.getTeam(user.team);
            Promise.all(team.players.map(async (username) => {
                return await database.getUser(username);
            })).then((players) => {
                res.render('my-team', {
                    title: 'My Team',
                    username: req.session.username,
                    
                    picks: team.draft_picks,
                    players: players,
                    team: team,
                    user: user
                });
            })
        } else {
            res.render('my-team', {
                title: 'my-team',
                username: req.session.username,

                user: user
            });
        }
    } else {
        next(createError(401));
    }
});

module.exports = router;
