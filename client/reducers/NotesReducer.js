import AppConstants from '../constants/AppConstants';

const initialState = {
  notes: [],
  loadingError: null,
  isLoading: true
};

function formatNote(note) {
  return {
    id: note._id,
    title: note.title,
    text: note.text,
    color: note.color || '#ffffff',
    createdAt: note.createdAt
  };
}

function notesReducer(state = initialState, action) {
  switch(action.type) {
    case AppConstants.LOAD_NOTES_REQUEST:
      return Object.assign({}, state, {
        isLoading: true
      });

    case AppConstants.LOAD_NOTES_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        notes: action.notes.map(formatNote),
        loadingError: null
      });

    case AppConstants.LOAD_NOTES_FAIL:
      return Object.assign({}, state, {
        loadingError: action.error
      });    

    default:
      return state;
  }
}

const NotesReducer = {
  notes: notesReducer
};

export default NotesReducer;