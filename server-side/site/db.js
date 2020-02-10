var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    ObjectID = mongo.ObjectID;
 
var MongoClient = mongo.MongoClient;
var db = {};
var connections = {};

class DB 
{
    static getDB(database)
    {
        return new Promise(function(resolve,reject)
        {
            if( !db.hasOwnProperty(database) )
            {
                MongoClient.connect("mongodb://"+process.env.MONGO_USER+":"+process.env.MONGO_PASSWORD+"@"+process.env.MONGO_IP+":27017/site?authSource=admin", function(err, authdb) {
                    if( err )
                    {
                        reject(err);
                    }
                    console.log( "connected!" );
                    let dbConnection = authdb.db(database);
                    db[database] = database;
                    connections[database] = authdb;
                    resolve(dbConnection)
                });
            }
            else {
                resolve(db[database]);
            }
        });
    }

    static close(database)
    {
        return new Promise(function(resolve,reject)
        {
            if( !connections.hasOwnProperty(database) )
            {
                reject(`Database has no connection to close: ${database}`);
            }
            let connection = connections[database];
            connection.close().then( function(res) { resolve(); });
        });
    }
}

module.exports = DB;

