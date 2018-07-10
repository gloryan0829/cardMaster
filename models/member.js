var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var memberSchema = new Schema({
    nickName : String,
    email : String,
    phone : String,
    publicKey : String
});

module.exports = mongoose.model('member', memberSchema);