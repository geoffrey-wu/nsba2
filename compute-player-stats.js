if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const { MongoClient, ObjectId } = require('mongodb');
const uri = `mongodb+srv://geoffreywu42:${process.env.MONGODB_PASSWORD ? process.env.MONGODB_PASSWORD : 'password'}@nsba2.ujpbt.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri);

client.connect().then(async () => {
    const database = client.db('nsba2');
    const users = database.collection('users');
    const draft = database.collection('draft');
    const teams = database.collection('teams');
    const mockDraft = database.collection('mock-draft');
    const schedule = database.collection('schedule');
    const results = database.collection('results');

    await users.updateMany({}, {
        $set: {
            stats: {
                gp: 0,
                tuh: 0,
                points: 0,
                ppg: 0,
                pp22: 0,
                statline: [0, 0, 0],
                statline_per_game: [0, 0, 0],
                statline_per_22: [0, 0, 0]
            }
        }
    });

    await teams.updateMany({}, {
        $set: {
            stats: {
                record: [0, 0],
                gp: 0,
                tuh: 0,
                points: 0,
                ppg: 0,
                pp22: 0,
                statline: [0, 0, 0],
                statline_per_game: [0, 0, 0],
                statline_per_22: [0, 0, 0],
                bonuses: {
                    points: 0,
                    num_heard: 0
                }
            }
        }
    });

    await results.find({}).forEach(async doc => {
        if (doc.home.score > doc.away.score) {
            await teams.updateOne({ name: doc.home.name }, {
                $inc: { 'stats.record.0': 1 }
            })
            await teams.updateOne({ name: doc.away.name }, {
                $inc: { 'stats.record.1': 1 }
            })
        } else if (doc.home.score < doc.away.score) {
            await teams.updateOne({ name: doc.home.name }, {
                $inc: { 'stats.record.1': 1 }
            })
            await teams.updateOne({ name: doc.away.name }, {
                $inc: { 'stats.record.0': 1 }
            })
        } else {
            await teams.updateOne({ name: doc.home.name }, {
                $inc: { 'stats.record.0': 0.5 }
            })
            await teams.updateOne({ name: doc.away.name }, {
                $inc: { 'stats.record.0': 0.5 }
            })
        }

        for (let location of ['home', 'away']) {
            Object.keys(doc[location].players).forEach(async username => {
                if (doc[location].players[username].tuh === 0) return;

                await users.updateOne({ username: username }, {
                $inc: {
                        'stats.gp': 1,
                        'stats.tuh': doc[location].players[username].tuh,
                        'stats.points': doc[location].players[username].points,
                        'stats.statline.0': doc[location].players[username].statline[0],
                        'stats.statline.1': doc[location].players[username].statline[1],
                        'stats.statline.2': doc[location].players[username].statline[2]
                    },
                });

                await teams.updateOne({ name: doc[location].name }, {
                    $inc: {
                        'stats.statline.0': doc[location].players[username].statline[0],
                        'stats.statline.1': doc[location].players[username].statline[1],
                        'stats.statline.2': doc[location].players[username].statline[2],
                        'stats.bonuses.num_heard': doc[location].players[username].statline[0],
                    },
                })
            });

            await teams.updateOne({ name: doc[location].name }, {
                $inc: {
                    'stats.gp': 1,
                    'stats.tuh': doc.tuh,
                    'stats.points': doc[location].score,
                    'stats.bonuses.points': doc[location].bonus,
                },
            });
        }
    }).then(() => {
        console.log('success');
    });
});
