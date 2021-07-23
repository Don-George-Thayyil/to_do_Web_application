const mongo = require('mongodb').MongoClient
var state = {db: null}

module.exports.connect = function(done){
    const url = 'mongodb://localhost:27017'
    const dbname = 'Todo_db'

    mongo.connect(url, (err, client)=>{
        if(err) return done(err);
        state.db = client.db(dbname);
        done();
        })
};

module.exports.get = function(){
    return state.db
}