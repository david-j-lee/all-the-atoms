import { combineReducers } from 'redux';
import ptableReducer from './ptableReducer';

export default combineReducers({
  ptable: ptableReducer
});