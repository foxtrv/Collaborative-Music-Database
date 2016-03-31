var express = require('express');
var router = express.Router();
var labelDal = require('../dal/label_dal');

router.get('/all', function(req, res) {
    labelDal.GetAll(function (err, result) {
            if (err) throw err;

            res.render('label/DisplayAllLabels.ejs', {rs: result});
        }
    );
});

router.get('/', function (req, res) {
        labelDal.GetByName(req.query.name,
            function (err, result) {
                if (err) throw err;
                res.render('label/DisplayLabelInfo.ejs', {
                    rs: result,
                    name: req.query.name }
                );
            })
    }
);








module.exports = router;