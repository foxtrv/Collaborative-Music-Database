var express = require('express');
var router = express.Router();
var albumDal = require('../dal/album_dal');
var trackDal = require('../dal/track_dal');

router.get('/all', function(req, res) {
    albumDal.GetAll(function (err, result) {
            if (err) throw err;

            res.render('album/DisplayAllAlbums.ejs', {rs: result});
        }
    );
});

router.get('/', function (req, res) {
    albumDal.GetByID(req.query.album_id,
        function (err, result) {
            if (err) throw err;
            albumDal.GetTracks(req.query.album_id, function (err, trackResults) {
                res.render('album/DisplayAlbumInfo.ejs', {
                    rs: result,
                    album_id: req.query.album_id,
                    trackResults: trackResults
                });
            })
        })
});










module.exports = router;