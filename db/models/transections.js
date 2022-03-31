var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TransectionSchema = new Schema({
  code: String,
  categoryName: String,
  amount: Number,
  createAt: Date
});

module.exports = mongoose.model('Transections', TransectionSchema, "transections", {strict: true});