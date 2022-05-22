var express = require('express');
var database = require('../database');
var router = express.Router();

router.get(/\/.+/, async (req, res, next) => {
    let teamName = req.url.substring(1);
    teamName = decodeURI(teamName);
    if (teamName.charAt(teamName.length - 1) === '/') {
        teamName = teamName.substring(0, teamName.length - 1);
    }

    let team = await database.getTeam({name: teamName});
    let gm = await database.getUserById(team.gm);
    let playerIds = team.players;
    let players = [];
    for (let id in playerIds) {
        let player = await database.getUserById(playerIds[id]);
        players.push(player);
    }
    if (team) {
        res.render('team', {
            title: 'My Team',
            gm: gm,
            players: players,
            picks: team.draft_picks,
            username: req.session.username,
            team: team
        });

        return;
    }
});

router.get('/', async (req, res, next) => {
    res.render('teams', { 
        title: 'Teams',
        teams: await database.getTeams(),
        username: req.session.username
    });
});

module.exports = router;
