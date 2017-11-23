var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/realtor');

router.get('/', function(req, res) {
  var collection = db.get('House');
  collection.find({}, function(err, houses){
    if (err) throw err;
    res.json(houses);
  });
});

module.exports = router;