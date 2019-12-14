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

// const rootReducer = (state, action) => {
    // console.log(state);
    // switch(action.type){
    //     case ALL_RESET_STATE: {
    //         return {
    //             state : undefined
    //         }
            
    //     }
    // }

    // return appReducer(state, action);
// }

export default rootReducer;