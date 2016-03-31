var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.GetAll = function(callback) {
    connection.query('SELECT * FROM album;',
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


exports.GetByID = function(album_id, callback) {
    console.log(album_id);
    var query = 'SELECT * FROM album WHERE album_id=' + album_id;
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

exports.Insert = function(album_info, callback) {
    console.log(album_info);

    var dynamic_query = 'INSERT INTO album (name, profile) VALUES (' +
        '\'' + album_info.name + '\', ' +
        '\'' + album_info.profile + '\', ' +
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

exports.GetTracks = function(album_id, callback){
    console.log(album_id);
    var query = 'SELECT t.title, t.artist, t.length, t.genre, t.label FROM track t JOIN album a ON a.title = t.album WHERE album_id = ' + album_id;
    console.log(query);
    connection.query(query, function(err, result){
        callback(err, result);
    })
}




















