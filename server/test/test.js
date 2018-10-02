const mocha = require('mocha');
const assert = require('assert');
const mongodb = require('mongodb');
const url = 'mongodb://localhost:27017';
const dbName = 'testDatabase';

describe('MongoDB tests', function() {

  //Clear database first
  mongodb.MongoClient.connect(url, {useNewUrlParser: true }, {poolSize:10}, (err, client) => {
    const db = client.db(dbName);
    db.collection("users").drop((err, res) => {client.close();});
    db.collection("groups").drop((err, res) => {client.close();});
  });

  //Connection code

});