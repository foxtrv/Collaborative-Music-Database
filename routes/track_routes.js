var express = require('express');
var router = express.Router();
var trackDal = require('../dal/track_dal');
var playlistDal = require('../dal/playlist_dal');

router.get('/all', function(req, res) {
    trackDal.GetAll(function (err, result) {
            if (err) throw err;
            res.render('track/DisplayAllTracks.ejs', {rs: result});
        }
    );
});

router.get('/', function (req, res) {
    trackDal.GetByID(req.query.track_id,
        function (err, result) {
            if (err) throw err;
            playlistDal.GetAll(function(err, trackResults){
                console.log(trackResults);
                res.render('track/DisplayTrackInfo.ejs', {
                    rs: result,
                    track_id: req.query.track_id,
                    trackResults: trackResults,
                    playlist_info: req.query
                });
            });
            })
        });

router.get('/insert', function(req, res){
    console.log(req.query.name);
    trackDal.GetAll(function(err, trackResults){
        console.log(trackResults);
        res.render('track/insert', {
            trackResults: trackResults,
            playlist_info: req.query,
            user: req.session.Account
        });
    })
});

router.get('/save', function(req, res) {
    console.log(req.query);
    trackDal.Insert(req.query, function(err, result) {
        if(err) {
            res.send('Error adding track.<br />' + err);
        }
        else {
            trackDal.GetAll(function (err, result) {
                    if (err) throw err;
                    res.render('track/DisplayAllTracks.ejs', {rs: result, title:'Track Added Successfully'});
                }
            );

        }
    });
})






module.exports = router;
