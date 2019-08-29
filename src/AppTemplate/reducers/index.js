import {combineReducers} from 'redux';
import peopleSlice from './peopleSlice';

export default combineReducers({
  people: peopleSlice.reducer,
});
