var mongoose  = require('mongoose');
var { Schema }    = mongoose;
var Promise   = require("bluebird");
var timestamps = require('mongoose-timestamp');
var paginate  = require('mongoose-paginate');

var DB_NAME   = 'user';
var MySchema   = new mongoose.Schema()

var fields = {
  password: {
    required: true,
    type: String
  },
  email: String,
  name: String,
  lastSeen: Date
};

var collection =
  {collection: DB_NAME};

var schema = new Schema(fields, collection);

schema.plugin(timestamps);
schema.plugin(paginate);

var model = mongoose.model(DB_NAME, schema);
Promise.promisifyAll(model);

module.exports = model;
module.exports.col = DB_NAME;
