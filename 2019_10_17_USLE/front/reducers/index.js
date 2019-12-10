import { combineReducers } from 'redux';
import userReducer from './userReducer';
import productReducer from './productReducer';
import cartReducer from './cartReducer';
import orderReducer from './orderReducer';
import adminProductReducer from './admin/adminProductReducer';
import adminCategoryReducer from './admin/adminCategoryReducer';
import adminBrandReducer from './admin/adminBrandReducer';

const rootReducer = combineReducers({
    userReducer,
    productReducer,
    cartReducer,
    orderReducer,
    adminProductReducer,
    adminCategoryReducer,
    adminBrandReducer,

});

export default rootReducer;