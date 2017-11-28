var mongoose = require('mongoose'),
Schema = mongoose.Schema,
passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    username: String,
    password: String,
    firstname: String,
    lastname: String,
    email: String,
    phone: String
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);