# NSBA

The official Github repository for the [National Science Bowl Association](https://nsba.herokuapp.com) Website.

## Website Structure

When a new request comes in at `/url`, it goes to `./bin/www`, which is listening for requests.
That will call `app.js`, which _routes_ the request to the correct router.
The router gets the required resources to display the correct page, and then sends a _rendered_ html file to the user.

- router may call `database.js` to get resources or `authentication.js` to authenticate
- `views/url` contains the page that the user is looking at

api calls (which begin with `/api/`) go to the api router, which itself may call `database.js` or `authentication.js`

#### Adding New Page:

- create new file at routes/`page-name`.js
- update router on `app.js`
- create new file at views/`page-name`.js

## Database Structure

The main principle behind the design of the database is that reading is much more common than writing.
- reads occur every time a user visits the website
- writes only occur when a username or team name changes

```js
user = {
    _id: user_id,
    firstName: first_name,
    lastName: last_name,
    email: email,
    discord: discord,
    grade: grade,       // A string. Common values include 'Freshman', 'Sophomore', 'Junior', 'Senior', or 'College'
    role: role,         // 'Player', 'GM', or 'Admin'
    username: username,
    password: password, // salted and hashed base-64 number
    team: team_name,
    bio: {
        generalBio: string,
        experience: string,
        competitions: string,
        textbooks: string
    },
    eligible: true/false,
    draftPick: draft_pick # what number draft pick the player was drafted at
}

team = {
    _id: team_id,
    gm: gm_name,
    name: team_name,
    players: [usernames...],
    draft_picks: [ draft_pick['_id'] ... ]
}

draft_pick = {
    _id: draft_number,
    gm: gm_name,
    player: player_name,
    team: team_name,
    trade_history: [trade_id...]
}

mock_draft = {
    _id: draft_number,
    player: player_name,
    player_id: player_id
}

result = {
    _id: game_number, // calculated from `week_number*matchups.length + matchups.indexOf(this_game)`, but not guaranteed
    week: week_number,
    home: {
        name: home_team_name,
        score: points_scored,
        bonus: bonus_points,
        players: {
            player_1 (username): {
                tuh: tossups_heard,
                points: num_points,
                statline: [4s, 0s, -4s]
            }, ...
        },
    }, 
    away: {
        name: home_team_name,
        score: points_scored,
        bonus: bonus_points,
        players: {
            player_1 (username): {
                tuh: tossups_heard,
                points: num_points,
                statline: [4s, 0s, -4s]
            }, ...
        },
    },
}

schedule = {
    _id: week_number,
    week: week_number,
    matchups: [
        [home_team_name, away_team_name],
        ...
    ],
    dates: [start_date, end_date] // [string, string]
}
```
