import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import NotesReducer from './reducers/NotesReducer';

export default combineReducers({
  routing: routerReducer,
  ...NotesReducer
});
