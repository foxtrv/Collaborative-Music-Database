var express = require('express');
var router = express.Router();
var AccountDal = require('../dal/Account_dal');

/* GET users listing. */
router.get('/create', function(req, res, next) {
  res.render("userFormCreate", {subtitle: "CS355"});
});

router.get('/save', function(req, res, next) {
  console.log(req.query);

  AccountDal.Insert(req.query, function(err, result){
    if (err) {
      res.send(err);
    }
    else {
      AccountDal.InsertAccountFoundBy(result.insertId, req.query.selectedOptions, function(err,result) {
        res.send("Successfully saved the data.");
      })
    }
  });
});

module.exports = router;
