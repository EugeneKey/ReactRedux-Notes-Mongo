import AppConstants from '../constants/AppConstants';

import api from '../api';

const NoteActions = {
  loadNotes() {
    return (dispatch) => {
      dispatch({
        type: AppConstants.LOAD_NOTES_REQUEST
      });

      api.listNotes()
            .then(({data}) => {
              dispatch({
                type: AppConstants.LOAD_NOTES_SUCCESS,
                notes: data
              });
            })
            .catch(err => {
              dispatch({
                type: AppConstants.LOAD_NOTES_FAIL,
                error: err
              });
            });
    };
  },

  createNote(note) {
    return (dispatch) => {
      api.createNote(note)
            .then(() => dispatch(this.loadNotes()))
            .catch(err => {
              console.error(err);
            });
    };
  },

  deleteNote(noteId) {
    return (dispatch) => {
      api.deleteNote(noteId)
            .then(() => dispatch(this.loadNotes()))
            .catch(err => {
              console.error(err);
            });
    };
  }
};

export default NoteActions;
