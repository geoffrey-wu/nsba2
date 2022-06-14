const matchup = document.getElementById('matchup');
const week = document.getElementById('week');
const MATCHUPS_PER_WEEK = 6;

var homeTeamPoints = 0;
var awayTeamPoints = 0;

document.getElementById('submit').addEventListener('click', () => {
    document.getElementById('submit').innerHTML = 'Adding Result...'

    let home_players = {};
    let away_players = {};

    for (let index = 1; index <= 7; index++) {
        if (document.getElementById(`player-${index}-home-name`).innerHTML) {
            home_players[document.getElementById(`player-${index}-home-name`).innerHTML] = {
                tuh: parseInt(document.getElementById(`player-${index}-home-tuh`).value || 0),
                points: parseInt(document.getElementById(`player-${index}-home-points`).innerHTML || 0),
                statline: [
                    parseInt(document.getElementById(`player-${index}-home-4s`).value || 0),
                    parseInt(document.getElementById(`player-${index}-home-0s`).value || 0),
                    parseInt(document.getElementById(`player-${index}-home-negs`).value || 0),
                ]
            };
        }

        if (document.getElementById(`player-${index}-away-name`).innerHTML) {
            away_players[document.getElementById(`player-${index}-away-name`).innerHTML] = {
                tuh: parseInt(document.getElementById(`player-${index}-away-tuh`).value || 0),
                points: parseInt(document.getElementById(`player-${index}-away-points`).innerHTML || 0),
                statline: [
                    parseInt(document.getElementById(`player-${index}-away-4s`).value || 0),
                    parseInt(document.getElementById(`player-${index}-away-0s`).value || 0),
                    parseInt(document.getElementById(`player-${index}-away-negs`).value || 0),
                ]
            };
        }
    }

    fetch(`/api/add-result`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            result: {
                _id: parseInt(week.value) * parseInt(MATCHUPS_PER_WEEK) + parseInt(matchup.value), // calculated from `week_number*matchups.length + matchups.indexOf(this_game)`, but not guaranteed
                week: parseInt(week.value),
                home: {
                    name: document.getElementById('home-team-name').innerHTML,
                    score: 0,
                    players: home_players
                }, 
                away: {
                    name: document.getElementById('away-team-name').innerHTML,
                    score: 0,
                    players: away_players
                },
            }
        })
    })

    document.getElementById('close').click();
});

/**
 * Dynamically update modal to display the correct team names and player names.
 */

week.addEventListener('input', () => {
    let numWeek = parseInt(week.value) - 1;

    matchup.innerHTML = '';

    {
        let option = document.createElement('option');
        let textNode = document.createTextNode('Select a matchup');
        option.appendChild(textNode);
        matchup.appendChild(option);
    }

    for (let i = 0; i < schedule[numWeek]['matchups'].length; i++) {
        let string = schedule[numWeek]['matchups'][i][0] + ' vs. ' + schedule[numWeek]['matchups'][i][1];

        let option = document.createElement('option');
        let textNode = document.createTextNode(string);
        option.appendChild(textNode);
        option.value = parseInt(i);
        matchup.appendChild(option);
    }
});

matchup.addEventListener('input', () => {
    let homeTeamName = schedule[week.value - 1]['matchups'][matchup.value][0];
    let awayTeamName = schedule[week.value - 1]['matchups'][matchup.value][1];
    document.getElementById('home-team-name').innerHTML = homeTeamName;
    document.getElementById('away-team-name').innerHTML = awayTeamName;

    let homeTeam = teams.filter(team => team.name === homeTeamName)[0];
    let awayTeam = teams.filter(team => team.name === awayTeamName)[0];

    for (let i = 0; i < homeTeam['players'].length; i++) {
        document.getElementById(`player-${i+1}-home-name`).innerHTML = homeTeam['players'][i];
    }

    for (let i = 0; i < awayTeam['players'].length; i++) {
        document.getElementById(`player-${i+1}-away-name`).innerHTML = awayTeam['players'][i];
    }
})

/**
 * Dynamically update modal to display the correct number of points
 */

function updatePoints(location, index) {
    if (location === 'home') {
        homeTeamPoints -= parseInt(document.getElementById(`player-${index}-${location}-points`).innerHTML);
    } else {
        awayTeamPoints -= parseInt(document.getElementById(`player-${index}-${location}-points`).innerHTML);
    }

    document.getElementById(`player-${index}-${location}-points`).innerHTML
        = 4*parseInt(document.getElementById(`player-${index}-${location}-4s`).value || 0)
        - 4*parseInt(document.getElementById(`player-${index}-${location}-negs`).value || 0);
    
    if (location === 'home') {
        homeTeamPoints += parseInt(document.getElementById(`player-${index}-${location}-points`).innerHTML);
        document.getElementById(`${location}-team-score`).innerHTML = homeTeamPoints;
    } else {
        awayTeamPoints += parseInt(document.getElementById(`player-${index}-${location}-points`).innerHTML);
        document.getElementById(`${location}-team-score`).innerHTML = awayTeamPoints;
    }
}

for (let location of ['home', 'away']) {
    for (let index = 1; index <= 7; index++) {
        document.getElementById(`player-${index}-${location}-4s`).addEventListener('input', () => {updatePoints(location=location, index=index)});
        document.getElementById(`player-${index}-${location}-negs`).addEventListener('input', () => {updatePoints(location=location, index=index)});
    }
}