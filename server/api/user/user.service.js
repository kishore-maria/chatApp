const Promise = require('bluebird');

const User = require('./user.schema');

const randomstring = require('randomstring');

const LoginHistoryServ = require('./login.history/login.history.service')

const io = require('../../components/socket/client.socketIO.service')

var jwt = require('jsonwebtoken');

this.find = (query) => {
  return User.find(query).lean();
};

this.findOne = (query) => {
  return User.findOne(query).lean();
};

this.create = user => {
  return new Promise(async(rs, rj) => {
    let message = this.validate(user)
    if (message)
      return rj(message)
    let existUser = await(User.findOne({email: user.email}))
    if (existUser)
      return rj('User already exist.')
    User.create(user, (err, _user) => {
      if (err)
        return rj(err);
      return rs(_user);
    });
  });
};

this.validate = user => {
  if (!user)
    return "User required."
  if (!user.name)
    return "Name required."
  if (!user.email)
    return "Email required."
  if (!user.password)
    return "Password required."
  let password = user.password
  if (password && !password.match(/[A-Z]/) || !password.match(/[a-z]/) || !password.match(/\d/) || !password.match(/[-!@#$%^&*()_+|~=`{}\[\]:";'<>?,.\\/]/) || password.length < 8)
    return "Password should contains one uppercase, one lowercase, one number, one symbol and length should be greater than or equalto 8 characters."
  return false
}

this.loginUser = (user, req) => {
  return new Promise(async(rs, rj) => {
    try {
      let _user = await(this.findOne({email: user.email}))
      if (!_user)
        return rj("User not found.")
      if (_user.password !== user.password)
        return rj("Incorrect password.")
      var token = jwt.sign({ foo: 'bar' }, 'chat');
      _user.password = randomstring.generate();
      this.setUserSession(_user, token, req)
      let data = {
        user: _user,
        token: token
      }
      return rs(data)
    } catch (err) {
      return rj(err)
    }
  })
}

this.setUserSession = (user, token, req) => {
  new Promise((resolve, reject) => {
    LoginHistoryServ.create(req, token, user);
    var res = {
      token: token,
      user: user
    };
    req.session.user = user;
    req.user = req.session.user;
    return resolve(res);
  })
}

this.update = user => {
  return new Promise((rs, rj) => {
    let message = this.validateUserForUpdate(user)
    if (message)
      return rj(message)
    User.findOneAndUpdate({ _id : user._id }, { '$set': user }, { new: true }, (err, _user) => {
      if (err) {
        return rj(err);
      }
      return rs(_user);
    });   
  });
};

this.validateUserForUpdate = (user) => {
  if (!user)
    return "User required."
  if (!user.name)
    return "Name required."
  return false
}

this.delete = (user) => {
  return new Promise((rs, rj) => {
    User.findByIdAndRemove(user._id, (err, _user) => {
      if (err) {
        return rj(err);
      }
      return rs(_user);
    });
  });
};

this.logout = async(token, user) => {
  try {
    await(LoginHistoryServ.logout(token, user))
    return
  } catch (err) {
    return err
  }
}

this.getActiveUSers = async(users) => {
  let key = "ACTIVE_USERS_LIST"
  let userIds = Object.keys(users);
  let query = {
    _id: { $in: userIds }
  }
  let activeUsers = await(User.find(query).lean())
  userIds.map(userId => io.sendUser(userId, key, activeUsers))
}