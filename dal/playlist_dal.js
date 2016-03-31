var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.GetAll = function(callback) {
    connection.query('SELECT * FROM playlist GROUP BY name;',
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
    var query = 'SELECT * FROM playlist WHERE name=' + '\'' + name + '\'';
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
    var query = 'SELECT * FROM playlist WHERE name=' + '\'' + name + '\'' + ' AND track IS NOT NULL;';
    console.log(query);
    connection.query(query, function(err, result){
        callback(err, result);
    })
}

exports.GetNumTracks = function(name, callback){
    console.log(name);
    var query = 'SELECT COUNT(*) as num_tracks FROM playlist WHERE name=' + '\'' + name + '\'' + ' AND track IS NOT NULL;';
    console.log(query);
    connection.query(query, function(err, result){
        callback(err, result);
    })
}


exports.Create = function(playlist_info, callback) {
    console.log(playlist_info);
    var dynamic_query = 'INSERT INTO playlist (name, artist, track) VALUES (' +
        '\'' + playlist_info.name + '\', ' + 'NULL, NULL);';
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

exports.Insert = function(playlist_info, callback) {
    console.log(playlist_info);
    var dynamic_query = 'INSERT INTO playlist (name, artist, track, username) VALUES (' +
        '\'' + playlist_info.name + '\', ' +
        '\'' + playlist_info.artist + '\', ' +
        '\'' + playlist_info.title + '\', ' +
        '\'' + playlist_info.username + '\'' +
        ');';
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