var mongoose = require('mongoose');
var { Schema } = mongoose;
var Promise = require("bluebird");
var timestamps = require('mongoose-timestamp');
var paginate = require('mongoose-paginate');

var DB_NAME = 'chat';

var fields = {
  message: String, // Sending messages
  status: String, // 1. FOR_SENDER: DELIVERED | SENT | READ || 2. FOR_RECEIVER: PENDING | RECEIVED | READ
  type: String, // IN | OUT
  sender: String, // Sender ID
  receiver: String, // Receiver ID
};

var collection =
  { collection: DB_NAME };

var schema = new Schema(fields, collection);

schema.plugin(timestamps);
schema.plugin(paginate);

var model = mongoose.model(DB_NAME, schema);
Promise.promisifyAll(model);

module.exports = model;
module.exports.col = DB_NAME;
