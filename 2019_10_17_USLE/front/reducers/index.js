import { combineReducers } from 'redux';
import userReducer from './userReducer';
// import post from './post';
import adminPrductReducer from './admin/adminProductReducer';
import adminCategoryReducer from './admin/adminCategoryReducer';
import adminBrandReducer from './admin/adminBrandReducer';

const rootReducer = combineReducers({
    userReducer,
    adminPrductReducer,
    adminCategoryReducer,
    adminBrandReducer,
//   post,
});

export default rootReducer;