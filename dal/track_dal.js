var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.GetAll = function(callback) {
    connection.query('SELECT * FROM track;',
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

exports.GetByID = function(track_id, callback) {
    console.log(track_id);
    var query = 'SELECT * FROM track WHERE track_id=' + track_id;
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

exports.GetByName = function(title, callback) {
    console.log(title);
    var query = 'SELECT * FROM track WHERE title=' + '\'' + title + '\'';
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

exports.Insert = function(playlist_info, callback) {
    console.log(playlist_info);
    var query;

    query = 'INSERT INTO artist (name) VALUES (' + '\'' + playlist_info.artist + '\'' + ');';
    console.log(query);
    connection.query(query);

    query = 'INSERT INTO record_label (name) VALUES (' + '\'' + playlist_info.label + '\'' + ');';
    console.log(query);
    connection.query(query);

    query = 'INSERT INTO album (title, artist, label) VALUES (' +
        '\'' + playlist_info.album + '\', ' +
        '\'' + playlist_info.artist + '\', ' +
        '\'' + playlist_info.label + '\' ' + ');';
    console.log(query);
    connection.query(query);

    var dynamic_query = 'INSERT INTO track (title, artist, length, genre, album, label, username) VALUES (' +
        '\'' + playlist_info.title + '\', ' +
        '\'' + playlist_info.artist + '\', ' +
        '\'' + playlist_info.length + '\', ' +
        '\'' + playlist_info.genre + '\', ' +
        '\'' + playlist_info.album + '\', ' +
        '\'' + playlist_info.label + '\', ' +
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

exports.GetTracksFromAlbum = function(title, callback) {
    console.log(title);
    var query = 'SELECT * FROM track WHERE album=' + '\'' + title + '\'';
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

