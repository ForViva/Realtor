var monk = require('monk');
var db = monk('localhost:27017/realtor');
var express = require('express');
var router = express.Router();

router.get('/:key', function(req, res) {
  var collection = db.get('House');
  const keyword = new RegExp(escapeRegex(req.params.key), 'gi');
  // var keyword = req.params.key;
	  collection.aggregate([
	  	  { $match: { $or: [ { state: keyword }, { address:keyword }, { city:keyword } ] } },
      ], function(err, sear) {
	      if (err) throw err;
	      res.json(sear);
	    }
	  );
	
});

// router.get('/ ', function(req, res) {
//   var collection = db.get('House');
//  	// const regex = new RegExp(escapeRegex(req.query.keywords), 'gi');
//  	res.json(req.query.keywords);

  // collection.find({
  //     statee: regex
  //   }, function(err, sear) {
  //     if (err) throw err;
  //     res.json(sear);
  //   }
  // );
// });

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = router;