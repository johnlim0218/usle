const initialState = {
    isAddingCart : false,
    addCartMessage: '',
    addCartErrorReason : '',
    isLoadingCart : false,
    cartList: null,
    loadCartErrorReason : '',
    isConfirmingQuantity : false,
    confirmQuantityErrorReason : '',
    isRemovingCart : false,
    removeCartErrorReason : '',
}

export const ADD_CART_REQUEST = "ADD_CART_REQUEST";
export const ADD_CART_SUCCESS = "ADD_CART_SUCCESS";
export const ADD_CART_FAILURE = "ADD_CART_FAILURE";
export const LOAD_CART_REQUEST = "LOAD_CART_REQUEST";
export const LOAD_CART_SUCCESS = "LOAD_CART_SUCCESS";
export const LOAD_CART_FAILURE = "LOAD_CART_FAILURE";
export const ADD_QUANTITY = "ADD_QUANTITY";
export const REMOVE_QUANTITY = "REMOVE_QUANTITY";
export const CONFIRM_CART_QUANTITY_REQUEST = "CONFIRM_CART_QUANTITY_REQUEST";
export const CONFIRM_CART_QUANTITY_SUCCESS = "CONFIRM_CART_QUANTITY_SUCCESS";
export const CONFIRM_CART_QUANTITY_FAILURE = "CONFIRM_CART_QUANTITY_FAILURE";
export const REMOVE_CART_REQUEST = "REMOVE_CART_REQUEST";
export const REMOVE_CART_SUCCESS = "REMOVE_CART_SUCCESS";
export const REMOVE_CART_FAILURE = "REMOVE_CART_FAILURE";

const cartReducer = (state = initialState, action) => {
    switch(action.type){
        case ADD_CART_REQUEST : {
            return {
                ...state,
                isAddingCart: true,
                addCartMessage: '',
            }
        }
        case ADD_CART_SUCCESS : {
            return {
                ...state,
                isAddingCart: false,
                addCartMessage: action.data,
            }
        }
        case ADD_CART_FAILURE : {
            return {
                ...state,
                isAddingCart: false,
                addCartErrorReason: action.error,
            }
        }

        case LOAD_CART_REQUEST : {
            return {
                ...state,
                isLoadingCart: true,
            }
        }
        case LOAD_CART_SUCCESS : {
            return {
                ...state,
                isLoadingCart: false,
                cartList: action.data.length !== 0 ? action.data : null,
            }
        }
        case LOAD_CART_FAILURE : {
            return {
                ...state,
                isLoadingCart: false,
                loadCartErrorReason: action.error,
            }
        }

        case ADD_QUANTITY : {
            let targetItemIndex = state.cartList.findIndex((value) => value.id === action.data.id);
            state.cartList[targetItemIndex].quantity ++;
            return {
                ...state,
            }
        }

        case REMOVE_QUANTITY : {
            let targetItemIndex = state.cartList.findIndex((value) => value.id === action.data.id);
            if(state.cartList[targetItemIndex].quantity > 1){
                state.cartList[targetItemIndex].quantity --;
            } 
            return {
                ...state,
            }
        }

        case CONFIRM_CART_QUANTITY_REQUEST : {
            return{
                ...state,
                isConfirmingQuantity: true,
            }
        }
        case CONFIRM_CART_QUANTITY_SUCCESS : {
            return{
                ...state,
                isConfirmingQuantity: false,
            }
        }
        case CONFIRM_CART_QUANTITY_FAILURE : {
            return{
                ...state,
                isConfirmingQuantity: false,
                confirmQuantityErrorReason: action.error,
            }
        }

        case REMOVE_CART_REQUEST : {
            return {
                ...state,
                isRemovingCart: true,
            }
        }
        case REMOVE_CART_SUCCESS : {
            const cartList = state.cartList.filter(value => value.id !== action.data);
            return {
                ...state,
                isRemovingCart: false,
                cartList,
            }
        }
        case REMOVE_CART_FAILURE : {
            return {
                ...state,
                isRemovingCart: false,
                removeCartErrorReason: action.error,
            }
        }

        default : {
            return {
                ...state,
            }
        }
    }
}

export default cartReducer;