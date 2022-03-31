var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CategorySchema = new Schema({
  code: String,
  name: String
});

module.exports = mongoose.model('Categories', CategorySchema, "categories", {strict: true});