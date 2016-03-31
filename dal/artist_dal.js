var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.GetAll = function(callback) {
    connection.query('SELECT * FROM artist;',
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            console.log(result);
            callback(false, result);
        }
    );
}


exports.GetByName = function(name, callback) {
    console.log(name);
    var query = 'SELECT * FROM artist WHERE name=' + '\'' + name + '\'';
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}

exports.GetTracks = function(name, callback){
    console.log(name);
    var query = 'SELECT * FROM track WHERE artist=' + '\'' + name + '\'';
    console.log(query);
    connection.query(query, function(err, result){
        callback(err, result);
    })
}

exports.Insert = function(artist_info, callback) {
    console.log(artist_info);

    var dynamic_query = 'INSERT INTO artist (name, profile) VALUES (' +
        '\'' + artist_info.name + '\', ' +
        '\'' + artist_info.profile + '\' ' +
        ');';
    console.log("test");
    console.log(dynamic_query);

    connection.query(dynamic_query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}






