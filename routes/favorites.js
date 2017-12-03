var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/realtor');

router.get('/', function(req, res) {
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
  var collection = db.get('Favorite');
  var user = monk.id(req.session.user);
  collection.find({
    user_id: user,
    house_id: req.params.id
    }, function(err, favi) {
      if (favi)
        res.json(true);
      else
        res.json(false);
    }
  );
});

router.post('/', function(req, res) {
  var collection = db.get('Favorite');
  var user = monk.id(req.session.user);
  var house = monk.id(req.body._id);
  if (user != '') {
      collection.insert({
        user_id: user,            
        house_id: house
      }, function(err, favi) {
          if (err) throw err;
          res.json(favi);
      });
  }
});

module.exports = router;