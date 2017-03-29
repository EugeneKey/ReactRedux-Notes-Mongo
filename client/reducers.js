import {combineReducers} from 'redux';
import NotesReducer from './reducers/NotesReducer';

export default combineReducers({
  ...NotesReducer
});
