var express = require('express');
var router = express.Router();
var AccountDal = require('../dal/Account_dal');

router.get('/all', function(req, res) {
    AccountDal.GetAll(function (err, result) {
            if (err) throw err;
            res.render('Account/DisplayAllAccounts.ejs', {rs: result});
        }
    );
});

router.get('/', function (req, res) {
    AccountDal.GetByID(req.query.account_id,
        function (err, result) {
            if (err) throw err;
            //accountDal.GetAddress(req.query.account_id, function(err, addressResults){
                res.render('Account/DisplayAccountInfo.ejs', {
                    rs: result,
                    account_id: req.query.account_id
                    //addressResults: addressResults}
                 });
            })
        }
    );

module.exports = router;