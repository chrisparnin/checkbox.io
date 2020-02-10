const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;

class DB 
{
    static getClient()
    {
        return new Promise(function(resolve,reject)
        {
            MongoClient.connect("mongodb://"+process.env.MONGO_USER+":"+process.env.MONGO_PASSWORD+"@"+process.env.MONGO_IP+":27017/site?authSource=admin", function(err, client) {
                if( err )
                {
                    reject(err);
                }
                console.log( "connected!" );
                resolve(client);
            });
        });
    }

    // static close()
    // {
    //     return new Promise(function(resolve,reject)
    //     {
    //         if( client == null || client == undefined )
    //         {
    //             reject(`Attempting to close invalid connection`);
    //         }
    //         client.close().then( function(res) 
    //         {
    //             client = null; 
    //             resolve(); 
    //         });
    //     });
    // }
}

module.exports = DB;

