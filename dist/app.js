'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _DataBaseUtils = require('./utils/DataBaseUtils');

var db = _interopRequireWildcard(_DataBaseUtils);

var _config = require('../etc/config.json');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var serverPort = process.env.PORT || _config.apiPort;

// Initialization of express application
var app = (0, _express2.default)();

// Set up connection of database
db.setUpConnection();

// Using bodyParser middleware
app.use(_bodyParser2.default.json());

// Allow requests from any origin
app.use((0, _cors2.default)({ origin: '*' }));

// RESTful api handlers
app.get('/notes', function (req, res) {
  db.listNotes().then(function (data) {
    return res.send(data);
  });
});

app.post('/notes', function (req, res) {
  db.createNote(req.body).then(function (data) {
    return res.send(data);
  });
});

app.delete('/notes/:id', function (req, res) {
  db.deleteNote(req.params.id).then(function (data) {
    return res.send(data);
  });
});

app.listen(serverPort, function () {
  console.log('Server is up and running on port ' + serverPort);
  console.log('MONGODB_URI: ' + process.env.MONGODB_URI);
  console.log('NODE_ENV: ' + process.env.NODE_ENV);
});