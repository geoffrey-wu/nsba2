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
    const picks = database.collection('picks');
    const mockDraft = database.collection('mock-draft');
    const results = database.collection('results')

    await users.find({ 'role': 'Player' }).forEach(async doc => {
        await users.updateOne({ _id: doc._id }, {
            $set: {
                'stats.ppg': doc.stats.points / doc.stats.gp,
                'stats.pp22': doc.stats.points / doc.stats.tuh * 22,
            }
        });
    }).then(() => {
        console.log('success');
    });
});
