import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import * as db from './utils/DataBaseUtils';

import {apiPort} from '../etc/config.json';

const serverPort = process.env.PORT || apiPort

// Initialization of express application
const app = express();

// Set up connection of database
db.setUpConnection();

// Using bodyParser middleware
app.use( bodyParser.json() );

// Allow requests from any origin
app.use(cors({origin: '*'}));

// RESTful api handlers
app.get('/notes', (req, res) => {
  db.listNotes().then(data => res.send(data));
});

app.post('/notes', (req, res) => {
  db.createNote(req.body).then(data => res.send(data));
});

app.delete('/notes/:id', (req, res) => {
  db.deleteNote(req.params.id).then(data => res.send(data));
});

app.listen(serverPort, function() {
  console.log('Server is up and running on port ' + serverPort);
  console.log('MONGODB_URI: ' + process.env.MONGODB_URI);
  console.log('NODE_ENV: ' + process.env.NODE_ENV);
});
