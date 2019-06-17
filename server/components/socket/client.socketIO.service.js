/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS205: Consider reworking code to avoid use of IIFEs
 * DS208: Avoid top-level this
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
// IO
var SocketServ        = require(('./socketIO.service'));

var UserService = require('../../api/user/user.service')

// Lib
var Promise     = require('bluebird');

var clientMacIds = {};
var clientSockets = {};

this.watchSocket = () => {
  return new Promise((rs, rj) => {
    buildListener();
    return rs();
  });
};

var buildListener = () => {
  return SocketServ.io.of('/clientUI').on('connect', socket => {
    // io.sockets.connected[clients.socket].emit('user-already-joined',data);
    let user = socket.handshake.session.user
    if(!user) {
      return;
    }
    var userId = user._id;

    var cSockets = clientSockets[userId];
    if (!cSockets) {
      cSockets = [];
    }
    clientSockets[userId] = cSockets;
    cSockets.push(socket);
    UserService.getActiveUSers(clientSockets, userId)
    
    return socket.on('disconnect', () => {
      let user = socket.handshake.session.user
      if(!user) {
        return;
      }
      var userId = user._id
      var cSockets = clientSockets[userId];
      if (cSockets) {
        var idx = cSockets.indexOf(socket);
        cSockets.splice(idx, 1);
        UserService.getActiveUSers(clientSockets, user._id)
        return
      }
    });
  });
};

this.sendUser = (userId, key, msg) => {
  if (!key) {
    return;
  }
  var clients = clientSockets[userId];
  if (!clients) {
    return;
  }
  return clients.map((client, i) => {
    client.emit(key, msg)
  });
};

this.logout = user => {
  if (!user) {
    return;
  }
  var userId = user._id;
  // var cSockets = clientSockets[userId];
  // // console.log(cSockets)
  // if (cSockets) {
  //   var idx = cSockets.indexOf(socket);
  //   cSockets.splice(idx, 1);
  //   // console.log(clientSockets)
  //   UserService.getActiveUSers(clientSockets, user._id)
  // }
  delete clientMacIds[userId];
  delete clientSockets[userId];
  UserService.getActiveUSers(clientSockets)
  return
};

module.exports = this;