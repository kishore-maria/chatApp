const mongoose = require('mongoose');

const Promise = require('bluebird');

mongoose.Promise = global.global.Promise;

const Config = require('../../config/config.json');

this.connect = () => {
  return new Promise((rs, rj) => {
    const DB_HOST = Config.mongo.host;
    const DB_NAME = Config.mongo.dbName;
    const dbParams = {
      useNewUrlParser: true
    };
    const url = `mongodb://${DB_HOST.join()}/${DB_NAME}`;
    mongoose.connect(url, dbParams);
    const db = mongoose.connection;
    db.on('open', () => {
      console.log(`DB connected to ${db.name}`);
      return rs();
    });
    db.on('error', (err) => {
      console.error('Connection error:', err);
      console.log('Process terminated');
      process.exit(1);
      return rj(err);
    });
  });
};
