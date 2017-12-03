var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/realtor');

var msg = { msg: "unauthorized" };

router.get('/', function(req, res) {
  if (req.session.user == '') {
    res.json(msg);
    return;
  }
  var collection = db.get('Favorite');
  var user = monk.id(req.session.user);
  collection.aggregate([
      {$match: { user_id: user }},
      {$lookup: {
        from: 'House',
        localField: 'house_id',
        foreignField: '_id',
        as: 'house'
      }}
    ], function(err, favis) {
      if (err) throw err;
      res.json(favis);
    }
  );
});

router.get('/:id', function(req, res) {
  if (req.session.user == '') {
    res.json(msg);
    return;
  }
  var collection = db.get('Favorite');
  var user = monk.id(req.session.user);
  var house = monk.id(req.params.id);
  collection.findOne({
      user_id: user,
      house_id: house
    }, function(err, favi) {
      if (err) throw err;
      res.json(favi);
    }
  );
});

router.post('/', function(req, res) {
  if (req.session.user == '') {
    res.json(msg);
    return;
  }
  var collection = db.get('Favorite');
  var user = monk.id(req.session.user);
  var house = monk.id(req.body._id);
  collection.insert({
      user_id: user,            
      house_id: house
    }, function(err, favi) {
      if (err) throw err;
      res.json(favi);
    }
  );
});

router.delete('/:id', function(req, res) {
  if (req.session.user == '') {
    res.json(msg);
    return;
  }
  var collection = db.get('Favorite');
  var user = monk.id(req.session.user);
  var house = monk.id(req.params.id);
  collection.remove({
      user_id: user,
      house_id: house
    }, function(err, favi) {
      if (err) throw err;
      res.json(favi);
    }
  );
});

module.exports = router;