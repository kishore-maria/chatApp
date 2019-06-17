const path = require('path');

const angularJson = require('../angular.json');

module.exports = (app) => {

  require('./api/user/user.route')(app);
  require('./api/chat/chat.route')(app);

  return app.get('*', (req, res) => res.sendFile(path.join(__dirname, `../${angularJson.projects['chatApplication'].architect.build.options.outputPath}/index.html`)));
}