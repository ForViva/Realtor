var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/realtor');

router.get('/', function(req, res) {
  var collection = db.get('House');
  collection.find({ isAval: true }, function(err, houses){
    if (err) throw err;
    res.json(houses);
  });
});

router.get('/:id', function(req, res) {
  var collection = db.get('House');
  collection.findOne({
    _id: req.params.id, 
  }, function(err, house) {
    if (err) throw err;
    res.json(house);
  });
});

module.exports = router;