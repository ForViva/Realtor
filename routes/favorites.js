var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/realtor');

router.get('/', function(req, res) {
  var collection = db.get('Favorite');
  var user = monk.id(req.session.user);
  var houses = [];
  // Favorite.find({  }, function(err, favis) {
  //   if (err) throw err;
  //   favis.forEach(function(favi) {
  //     console.log(favi);
  //     House.findOne({ _id: favi.house_id }), function(err, house) {
  //       if (err) throw err;
  //         houses.push(house);
  //     }
  //   });
  //   res.json(houses);
  // });
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

// router.get('/:id', function(req, res) {
//   var collection = db.get('House');
//   collection.findOne({
//     _id: req.params.id, 
//   }, function(err, house) {
//     if (err) throw err;
//     res.json(house);
//   });
// });

module.exports = router;