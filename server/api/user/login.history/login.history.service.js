var Promise = require('bluebird');
var path = require('path');
var useragent = require('useragent');
useragent(true);
var IPLocation = require('iplocation').default;

var LoginHistory = require('./login.history.schema');
var UserServ = require('../user.service');
var ClientServSocket = require('../../../components/socket/client.socketIO.service');


this.create = (req, token, user) => {
  var ua = useragent.is(req.headers['user-agent']);
  var agent = useragent.parse(req.headers['user-agent']);
  var browser = agent.toAgent();
  var os = agent.os.toString();
  var device = agent.device.toString();
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
  ip = ip.split(',')[0];
  ip = ip.split(':').slice(-1);
  if (ip && (ip.length > 0)) {
    ip = ip[0];
  }
  //geo = IPLocation.lookup(ip)
  IPLocation(ip).then(location =>  {
    var loginHistory = {
      userId: user._id,
      action: 'login',
      time: new Date(),
      ip,
      geo: location,
      userAgent: ua,
      browser,
      os,
      device,
      cookieToken: token,
      status: 'IN'
    };
    loginHistory = new LoginHistory(loginHistory);
    return loginHistory.save();
  });
};

this.findActiveUser = token =>
  new Promise(function (resolve, reject) {
    var query = {
      cookieToken: token,
      status: 'IN'
    };
    return LoginHistory
      .findOne(query)
      .then(function (loginHistory) {
        if (loginHistory && loginHistory.userId) {
          return UserServ
            .findOne({ _id: loginHistory.userId })
            .then(user => resolve(user)).catch(err => reject(err));
        } else {
          return reject(new Error('Invalid token.'));
        }
      }).catch(err => reject(err));
  })
  ;

this.findCognitoToken = cookieToken =>
  new Promise(function (resolve, reject) {
    var query = {
      cookieToken,
      status: 'IN'
    };
    return LoginHistory
      .findOne(query)
      .then(function (loginHistory) {
        if (loginHistory) {
          return resolve(loginHistory.cognitoToken);
        } else {
          return reject(new Error('Invalid token.'));
        }
      }).catch(err => reject(err));
  })
  ;

this.logout = (cookieToken, user) => {
  new Promise((resolve, reject) => {
    var query = {
      cookieToken,
      status: 'IN'
    };
    return LoginHistory.findOneAndUpdate(query, { '$set': { status: 'OUT' } }, { multi: true }, (err, result) => {
      if (err)
        return reject(err);
      else {
        ClientServSocket.logout(user);
        return resolve(result);
      }
    });
  })
};

this.findByQuery = async(query) => {
  try {
    var result = await(LoginHistory.find(query))
    return result
  } catch (err) {
    return err
  }
};

module.exports = this;