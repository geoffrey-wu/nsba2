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
            if (team) {
                let players = team.player_ids.map(async (id) => {
                    return await database.getUserById(id);
                });
                res.render('my-team', {
                    title: 'My Team',
                    username: req.session.username,
                    
                    picks: team.draft_picks,
                    players: players,
                    team: team,
                    user: user
                });
            } else {
                res.render('my-team', {
                    user: user,
                    title: 'my-team',
                    username: req.session.username
                });
            }
            return;
        }
    }

    res.render('my-team', {
        user: {},
        title: 'my-team',
        username: req.session.username
    });
});

module.exports = router;
