import { combineReducers } from 'redux';
import userReducer from './userReducer';
// import post from './post';

const rootReducer = combineReducers({
    userReducer,
//   post,
});

export default rootReducer;