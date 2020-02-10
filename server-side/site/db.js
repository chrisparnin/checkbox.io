var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    ObjectID = mongo.ObjectID;
 
var MongoClient = mongo.MongoClient;
var db = {};

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
                    resolve(dbConnection)
                });
            }
            else {
                resolve(db[database]);
            }
        });
    }
}

module.exports = DB;

