const { MongoClient } = require('mongodb');
const uri = `mongodb+srv://geoffreywu42:${process.env.MONGODB_PASSWORD ? process.env.MONGODB_PASSWORD : 'LFsAjFrEPrn1fSqa'}@nsba.ujpbt.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri);


async function run() {
    try {
        await client.connect();

        const database = client.db('nsba');
        const users = database.collection('users');

        for (let gm in gms) {
            gms[gm]['_id'] = gm;
            gms[gm].role = 'Player';
            gms[gm].password = 'KT8FbMVkWahCZDyOTMw47+ajO/uwQXLIaOQHQF3FVsY=';
            await users.insertOne(gms[gm]);
        }
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);