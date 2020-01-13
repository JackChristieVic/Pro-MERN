// import the MongoClient object from the driver
const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost/issuetracker';
// Atlas URL - replace UUU with user, PPP with password, XXX with hostname // const url = 'mongodb + srv:// UUU:PPP@ cluster0-XXX.mongodb.net/ issuetracker? retryWrites = true'; // mLab URL - replace UUU with user, PPP with password, XXX with hostname // const url = 'mongodb:// UUU:PPP@ XXX.mlab.com: 33533/ issuetracker';
// OFFICE SITE: https://mongodb.github.io/node-mongodb-native/3.4/tutorials/connect/

function testWithCallbacks(callback) {
    console.log('\n--- TestWithCallbacks ---');
    // create a new client 
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true  });

    // make a connection to the local database by using the async method connect()
    client.connect((err, client) => {
        if(err) {
            callback(err);
            return;
        }
        console.log('Connected to MongoDB');

        const db = client.db();
        const collection = db.collection('employees');
    
        const employee = { id: 1, name: 'A. callback', age: 23};
        // insert one document into the employees database, asynchronously
        // by passing a function with error and result as params.
        collection.insertOne(employee, (err, result) => {
            if(err) {
                client.close();
                callback(err);
                return;
            }
            // insertedId is a property of result
            console.log('Result of insert: \n', result.insertedId);
            collection.find( {_id: result.insertedId }).toArray((err, docs) => {
                    if(err) {
                        client.close();
                        callback(err);
                        return;
                    }
                console.log('Result of find: \n', docs);
                client.close();
                callback(err);
            });
        });
    });
}


async function testWithAsync() {
    console.log('\n--- TestWithCallbacks ---');
    // create a new client 
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true  });
    try {
        // make a connection to the local database by using the async method connect()
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db();
        const collection = db.collection('employees');
    
        const employee = { id: 2, name: 'A. Async', age: 100};
        // insert one document into the employees database, asynchronously
        // by passing a function with error and result as params.
        const result = await collection.insertOne(employee);

      
        console.log('Result of insert: \n', result.insertedId);
        const docs = await collection.find( {_id: result.insertedId }).toArray();
                 
        console.log('Result of find: \n', docs);
    } catch (error) {
        console.log(error);
    } finally {
        client.close();
    }
}

testWithCallbacks(function(err) {
    if(err) {
        console.log(err);
    }
    testWithAsync()
})

