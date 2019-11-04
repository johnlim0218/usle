import { combineReducers } from 'redux';
import userReducer from './userReducer';
// import post from './post';
import adminPrductReducer from './admin/adminProductReducer';
import adminCategoryReducer from './admin/adminCategoryReducer';

const rootReducer = combineReducers({
    userReducer,
    adminPrductReducer,
    adminCategoryReducer,
//   post,
});

export default rootReducer;