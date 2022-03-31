var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AccountSchema = new Schema({
  code: String,
  firstName: String,
  lastName: String,
  balance: Number
});

module.exports = mongoose.model('Accounts', AccountSchema, "accounts", {strict: true});