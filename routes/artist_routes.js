var express = require('express');
var router = express.Router();
var artistDal = require('../dal/artist_dal');

router.get('/all', function(req, res) {
    artistDal.GetAll(function (err, result) {
            if (err) throw err;

            res.render('artist/DisplayAllArtists.ejs', {rs: result});
        }
    );
});

router.get('/', function (req, res) {
    artistDal.GetByName(req.query.name,
        function (err, result) {
            if (err) throw err;
            artistDal.GetTracks(req.query.name, function (err, trackResults) {
                res.render('artist/DisplayArtistInfo.ejs', {
                    rs: result,
                    name: req.query.name,
                    trackResults: trackResults
                })
            })
        })
});







module.exports = router;