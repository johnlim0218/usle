import { combineReducers } from 'redux';
import userReducer from './userReducer';
// import post from './post';
import adminProductReducer from './admin/adminProductReducer';
import adminCategoryReducer from './admin/adminCategoryReducer';
import adminBrandReducer from './admin/adminBrandReducer';

const rootReducer = combineReducers({
    userReducer,
    adminProductReducer,
    adminCategoryReducer,
    adminBrandReducer,
//   post,
});

export default rootReducer;