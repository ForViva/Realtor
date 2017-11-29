var express = require('express');
var expressValidator = require('express-validator');
var passport = require('passport');
var User = require('../models/user');
var router = express.Router();

router.get('/', function(req, res) {
	res.render('index', { user : req.user });
});

router.get('/register', function(req, res) {
	res.render('register', { });
});

router.post('/register', function(req, res) {
	req.checkBody('username', 'Invalid email.').isEmail();
	req.checkBody('phone', 'Invalid Phone number.').isInt();

	var errors = req.validationErrors();

	if (errors) {
		return res.render('register', { errors: errors });
	} else {
		User.findOne({ 'username': req.body.username })
			.exec( function(err, found_username) {
				console.log('found_username: ' + found_username);
				if (err) { 
					return next(err); 
				}
				if (found_username) { 
					return res.render('register', { user : user });
				}	else {
					User.register(new User({ username : req.body.username, phone : req.body.phone }), req.body.password, function(err, user) {
						if (err) {
							return res.render('register', { user : user });
						}
						passport.authenticate('local')(req, res, function() {
							res.redirect('/');
						});
					});
				}
			}
		);
	}
});

router.get('/login', function(req, res) {
	res.render('login', { user : req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
	res.redirect('/');
});

router.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});

router.get('/ping', function(req, res){
	res.send("pong!", 200);
});

module.exports = router;
