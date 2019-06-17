const Config = require('../../config/config');

const ChatService = require('./chat.service');

const index = `${Config.server.context}/api/chat`;

const join = link => index + (link != null ? link : '');

module.exports = (app) => {
  app.get(join("/:userId"), this.getUserChat);
  app.post(join("/send"), this.sendMessage);
};

this.getUserChat = async (req, res) => {
  if (req.session.user == null)
    return res.status(401).send('Unauthorized');
  let sender = req.session.user._id
  let receiver = req.params.userId
  try {
    let messages = await(ChatService.getMessages(sender, receiver))
    return res.send(messages)
  } catch (err) {
    return res.status(400).send(err)
  }
};

this.sendMessage = async (req, res) => {
  let data = req.body
  let user = req.session.user
  try {
    let sendSuccess = await(ChatService.sendMessage(data, user))
    return res.send(sendSuccess)
  } catch (err) {
    return res.status(400).send(err)
  }
}