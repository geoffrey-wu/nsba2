const matchup = document.getElementById('matchup');
const week = document.getElementById('week');
const MATCHUPS_PER_WEEK = 6;
const PLAYERS_PER_TEAM = 7;

var homeTeamPoints = 0;
var awayTeamPoints = 0;

document.getElementById('submit').addEventListener('click', () => {
    document.getElementById('submit').innerHTML = 'Adding Result...'

    let home_players = {};
    let away_players = {};

    for (let index = 1; index <= PLAYERS_PER_TEAM; index++) {
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
                    score: parseInt(document.getElementById('home-team-score').innerHTML),
                    bonus: parseInt(document.getElementById('home-team-bonus').value || 0),
                    players: home_players
                }, 
                away: {
                    name: document.getElementById('away-team-name').innerHTML,
                    score: parseInt(document.getElementById('away-team-score').innerHTML),
                    bonus: parseInt(document.getElementById('away-team-bonus').value || 0),
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
    for (let location of ['away', 'home']) {
        var teamName = schedule[week.value - 1]['matchups'][matchup.value][location === 'home' ? 0 : 1];

        document.getElementById(`${location}-team-name`).innerHTML = teamName;
    
        let team = teams.filter(team => team.name === teamName)[0];
    
        for (let i = 0; i < PLAYERS_PER_TEAM; i++) {
            document.getElementById(`player-${i+1}-${location}-name`).innerHTML = '';
        }
    
        for (let i = 0; i < team['players'].length; i++) {
            document.getElementById(`player-${i+1}-${location}-name`).innerHTML = team['players'][i];
        }
    }
})

/**
 * Dynamically update modal to display the correct number of points when a player's stats are changed.
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
        document.getElementById(`${location}-team-score`).innerHTML = homeTeamPoints + parseInt(document.getElementById('home-team-bonus').value || 0);
    } else {
        awayTeamPoints += parseInt(document.getElementById(`player-${index}-${location}-points`).innerHTML);
        document.getElementById(`${location}-team-score`).innerHTML = awayTeamPoints + parseInt(document.getElementById('away-team-bonus').value || 0);
    }
}

for (let location of ['home', 'away']) {
    for (let index = 1; index <= 7; index++) {
        document.getElementById(`player-${index}-${location}-4s`).addEventListener('input', () => {updatePoints(location=location, index=index)});
        document.getElementById(`player-${index}-${location}-negs`).addEventListener('input', () => {updatePoints(location=location, index=index)});
    }
}

for (let location of ['home', 'away']) {
    document.getElementById(`${location}-team-bonus`).addEventListener('input', () => {
        document.getElementById(`${location}-team-score`).innerHTML = homeTeamPoints + parseInt(document.getElementById(`${location}-team-bonus`).value || 0);
    })
}