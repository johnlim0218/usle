const initialState = {
    isAddingCart : false,
    addCartErrorReason : '',
    isLoadingCart : false,
    loadCartErrorReason : '',
}

export const ADD_CART_REQUEST = "ADD_CART_REQUEST";
export const ADD_CART_SUCCESS = "ADD_CART_SUCCESS";
export const ADD_CART_FAILURE = "ADD_CART_FAILURE";
export const LOAD_CART_REQUEST = "LOAD_CART_REQUEST";
export const LOAD_CART_SUCCESS = "LOAD_CART_SUCCESS";
export const LOAD_CART_FAILURE = "LOAD_CART_FAILURE";

const cartReducer = (state = initialState, action) => {
    switch(action.type){
        case ADD_CART_REQUEST : {
            return {
                ...state,
                isAddingCart: true,
            }
        }
        case ADD_CART_SUCCESS : {
            return {
                ...state,
                isAddingCart: false,
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
            }
        }
        case LOAD_CART_FAILURE : {
            return {
                ...state,
                isLoadingCart: false,
                loadCartErrorReason: action.error,
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