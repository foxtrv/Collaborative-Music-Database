var express = require('express');
var router = express.Router();
var playlistDal = require('../dal/playlist_dal');

router.get('/all', function(req, res) {
    playlistDal.GetAll(function (err, result) {
            if (err) throw err;
            res.render('playlist/DisplayAllPlaylists.ejs', {rs: result});
        }
    );
});

router.get('/', function (req, res) {
    playlistDal.GetByName(req.query.name,
        function (err, result) {
            if (err) throw err;
            playlistDal.GetTracks(req.query.name, function (err, trackResults) {
                playlistDal.GetNumTracks(req.query.name, function (err, trackResults2) {
                res.render('playlist/DisplayPlaylistInfo.ejs', {
                    rs: result,
                    name: req.query.name,
                    trackResults: trackResults,
                    trackResults2: trackResults2
                })})
            });
        })
})

router.get('/create', function(req, res) {
    playlistDal.GetAll(function(err, result) {
        res.render('playlist/create', {address : result});
    });
});

router.get('/save', function(req, res) {
    console.log(req.query);
    playlistDal.Create(req.query, function(err, result) {
        if(err) {
            res.send('Error adding new playlist.<br />' + err);
        }
        else {
            res.redirect('/playlist/all');
        }
    });
})

router.get('/insert', function(req, res){
    console.log(req.query.name);
    playlistDal.GetAll(function(err, trackResults){
        console.log(trackResults);
        res.render('playlist/insert', {
            trackResults: trackResults,
            playlist_info: req.query,
            //user: req.session.username
            user: req.session.Account
        });
    })
});

router.get('/saveInsert', function(req, res) {
    console.log(req.query);
    playlistDal.Insert(req.query, function(err, result) {
        if(err) {
            res.send('Error adding to playlist.<br />' + err);
        }
        else {
            res.redirect('/playlist/?name='+req.query.name);
        }
    });
})




module.exports = router;