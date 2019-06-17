const Config = require('../../config/config');

const UserService = require('./user.service');

const index = `${Config.server.context}/api/user`;

const join = link => index + (link != null ? link : '');

module.exports = (app) => {
  app.get(join("/me"), this.getProfile);
  app.get(join("/allUsers"), this.getAllUsers);
  // app.get(join('/'), this.findAll);
  // app.get(join('/:id'), this.findOne);
  app.post(join('/login'), this.loginUser);
  app.post(join('/'), this.create);
  app.post(join('/logout'), this.logout);
  // app.put(join('/:id'), this.update);
  // app.delete(join('/:id'), this.delete);
};

this.getProfile = async(req, res) => {
  if (req.session.user == null)
    return res.status(401).send('Unauthorized');
  else
    return res.send(req.session.user);
};

this.getAllUsers = async(req, res) => {
  try {
    let user = req.session.user
    let query = {
      _id: {$ne: user._id}
    }
    let allUsers = await(UserService.find(query))
    res.send(allUsers)
  } catch (err) {
    res.status(400).send(err)
  }
}

this.create = (req, res) => {
  let user = req.body;
  user.email = user.email.toLowerCase()
  UserService.create(user)
  .then(user => {
    return res.send(user);
  }).catch(err => {
    return res.status(400).send(err);
  });
};

this.loginUser = async(req, res) => {
  let user = req.body;
  if (!user)
    return res.status(400).send("user not found");
  user.email = user.email.toLowerCase()
  try {
    let data = await(UserService.loginUser(user, req))
    return res.send(data)
  } catch (err) {
    return res.status(400).send(err)
  }
};

this.logout = async(req, res) => {
  try {
    let token = req.body.token
    await(UserService.logout(token, req.session.user))
    delete req.session.user;
    return res.send()
  } catch (err) {
    return res.status(400).send(err)
  }
};