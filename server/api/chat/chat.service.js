const Promise = require('bluebird');

const Chat = require('./chat.schema');

const io = require('../../components/socket/client.socketIO.service')

this.find = (query) => {
  return Chat.find(query).lean();
};

this.findOne = (query) => {
  return Chat.findOne(query).lean();
};

this.getMessages = (sender, receiver) => {
  return new Promise(async (rs, rj) => {
    try {
      let query = {
        $or: [
          {
            sender: sender,
            receiver: receiver,
            type: "OUT"
          },
          {
            sender: receiver,
            receiver: sender,
            type: "IN"
          }
        ]
      }
      let messages = await(Chat.find(query).sort({createdAt: 1}))
      return rs(messages)
    } catch (err) {
      return rj(err)
    }
  })
}

this.sendMessage = (data, user) => {
  return new Promise(async (rs, rj) => {
    try {
      let forSender = {
        sender: user._id,
        receiver: data.userId,
        message: data.message,
        type: "OUT",
        status: "SENT"
      }
      let chat = new Chat(forSender)
      chat = await(chat.save())
      // let key = "SEND_MESSAGE"
      // io.sendUser(user._id, key, chat)
      let forReceiver = {
        sender: user._id,
        receiver: data.userId,
        message: data.message,
        type: "IN",
        status: "PENDING"
      }
      let _chat = new Chat(forReceiver)
      _chat = await(_chat.save())
      key = "GOT_MESSAGE"
      io.sendUser(data.userId, key, _chat)
      return rs(chat)
    } catch (err) {
      console.log(err)
      return rj(err)
    }
  })
}