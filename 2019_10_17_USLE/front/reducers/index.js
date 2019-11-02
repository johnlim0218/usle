import { combineReducers } from 'redux';
import userReducer from './userReducer';
// import post from './post';
import adminPrductReducer from './admin/adminProductReducer';

const rootReducer = combineReducers({
    userReducer,
    adminPrductReducer,
//   post,
});

export default rootReducer;