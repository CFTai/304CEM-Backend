var MongoClient = require('mongodb').MongoClient;
var config = require('./config');
const client = new MongoClient(config.MONGODB_URI);
const dbName='304CEM';

async function createCollection(collectionName) {
    try { 
        client.connect();
        const database = client.db(dbName);
        const result = await database.createCollection(collectionName);
        console.log(result);
    } finally {
        await client.close();
    }
}

function insertDataMany(collectionName, value, callBack=null) {
    // callback();
    // try {
    //     dbName.collectionName.insertMany(value);
    //  } catch (e) {
    //     print (e);
    //  }
    MongoClient.connect(url, function(err,db){
        if(err) throw err;
    });
}

async function insertDataNew(collectionName, value, callBack=null) {
    var result;
    try {
        await new Promise(resolve => setTimeout(resolve, 3000));
        client.connect();
        const database = client.db(dbName);
        const collection = database.collection(collectionName);
        result = await collection.insertOne(value);
    } finally {
        await client.close();
    }
    return result;
}

function updateData(collectionName, dbName, id, value, callBack=null) {
}

function getData(collectionName, dbName, id, filter=null, orderBy=null, asending=true) {
}

function getDataOne(collectionName, dbName, id, filter=null, orderBy=null, asending=true) {
}

function updateDataStatus(collectionName, dbName, id, status, callBack=null) {
}

module.exports = { 
    createCollection,
    insertDataMany,
    insertDataNew,
    updateData,
    getData,
    getDataOne,
    updateDataStatus,
};


// Callback explain
// ========================================
// function testFunc(callBack=null){
//     if (callBack !== null) {
//         callBack();
//     } else {
//         console.log('No callback provide');
//     }
// }

// function callBackFunc() {
//     console.log('testing');
// }

// testFunc(callBackFunc);
// createCollect('Test collection', 'testDB');