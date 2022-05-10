var MongoClient = require('mongodb').MongoClient;
var url='mongodb://localhost:27017/';

function createCollect(collectionName, dbName) {
    MongoClient.connect(url, function(err,db) {
        if (err) throw err;
        var dbo = db.db(dbName);
        dbo.createCollection(collectionName, function(err, res) {
            if (err) throw err;
            console.log('Collection created!');
            db.close();
        });
    });
}

function insertDataMany(collectionName, dbName, value, callBack=null) {
    // callback();
}

function insertDataNew(collectionName, dbName, value, callBack=null) {
}

function updateData(collectionName, dbName, id, value, callBack=null) {
}

function getData(collectionName, dbName, id, filter=null, orderBy=null, asending=true) {
}

function updateDataStatus(collectionName, dbName, id, status, callBack=null) {
}


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