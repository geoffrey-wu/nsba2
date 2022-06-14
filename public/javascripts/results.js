document.getElementById('submit').addEventListener('click', () => {
    let home_players = {};
    let away_players = {};
    for (let index = 1; index <= 7; index++) {
        home_players[document.getElementById(`player-${index}-home-name`).innerHTML] = {
            tuh: document.getElementById(`player-${index}-home-tuh`).value,
            points: document.getElementById(`player-${index}-home-points`).value,
            statline: [
                document.getElementById(`player-${index}-home-4s`).value,
                document.getElementById(`player-${index}-home-0s`).value,
                document.getElementById(`player-${index}-home-negs`).value,
            ]
        };

        away_players[document.getElementById(`player-${index}-away-name`).innerHTML] = {
            tuh: document.getElementById(`player-${index}-away-tuh`).value,
            points: document.getElementById(`player-${index}-away-points`).value,
            statline: [
                document.getElementById(`player-${index}-away-4s`).value,
                document.getElementById(`player-${index}-away-0s`).value,
                document.getElementById(`player-${index}-away-negs`).value,
            ]
        };
    }

    document.getElementById('submit').innerHTML = 'Adding Result...'

    fetch(`/api/add-result`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            result: {
                _id: 0, // calculated from `week_number*matchups.length + matchups.indexOf(this_game)`, but not guaranteed
                week: document.getElementById('week').value,
                home: {
                    name: document.getElementById('home-team-name').value,
                    score: 0,
                    players: home_players
                }, 
                away: {
                    name: document.getElementById('away-team-name').value,
                    score: 0,
                    players: away_players
                },
            }
        })
    })
});