var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/realtor');

router.get('/', function(req, res) {
  var collection = db.get('House');
  collection.find({  }, function(err, houses){
    if (err) throw err;
    res.json(houses);
  });
});


router.post('/', function(req, res){
    var collection = db.get('House');
    collection.insert({
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip
    }, function(err, house){
        if (err) throw err;
        res.json(house);
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

router.put('/:id', function(req, res){
    var collection = db.get('House');
    collection.update({
        _id: req.params.id
    },
    {
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip
    }, function(err, house){
        if (err) throw err;
        res.json(house);
    });
});

router.delete('/:id', function(req, res) {
    var collection = db.get('House');
    collection.remove({ _id: req.params.id}, function(err, house){
        if (err) throw err;
        res.json(house);
    });
});

module.exports = router;