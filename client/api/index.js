import axios from 'axios';

import {apiPrefix} from '../../etc/config.json';

const apiServer = process.env.NODE_ENV == 'development' ? apiPrefix : process.env.API_SERVER

export default {
  listNotes() {
    return axios.get(`${apiServer}/notes`);
  },

  createNote(data) {
    return axios.post(`${apiServer}/notes`, data);
  },

  deleteNote(noteId) {
    return axios.delete(`${apiServer}/notes/${noteId}`);
  }
};
