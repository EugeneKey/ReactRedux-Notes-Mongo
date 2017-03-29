'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setUpConnection = setUpConnection;
exports.listNotes = listNotes;
exports.createNote = createNote;
exports.deleteNote = deleteNote;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

require('../models/Note');

var _config = require('../../etc/config.json');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Note = _mongoose2.default.model('Note');

function setUpConnection() {
  _mongoose2.default.Promise = global.Promise;
  _mongoose2.default.connect(process.env.MONGODB_URI || _config2.default.mongodb);
}
function listNotes() {
  return Note.find();
}

function createNote(data) {
  var note = new Note({
    title: data.title,
    text: data.text,
    color: data.color,
    createdAt: new Date()
  });

  return note.save();
}

function deleteNote(id) {
  return Note.findById(id).remove();
}