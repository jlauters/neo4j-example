

/**
 * Module dependencies.
 */

var express = require('express')
  , http    = require('http')
  , path    = require('path')
  , config  = require('./config/config');

var app = express();
app.configure(function(){
  app.set('port', 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.static(path.join(__dirname, 'public')));
});

require('./config/routes')(app, config);

var server;
server = http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

module.exports = {
  app: app,
  server: server,
};
