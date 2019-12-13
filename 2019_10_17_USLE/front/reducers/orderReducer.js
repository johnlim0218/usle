const initialState = {
    orderedItemList: [],
    isCheckingOut: false,
    ordered: null,
    errorReasonSaveTempOrder: '',
}

export const MAKE_ORDER_FORM = "MAKE_ORDER_FORM";
export const ORDER_REQUEST = "ORDER_REQUEST";
export const ORDER_SUCCESS = "ORDER_SUCCESS";
export const ORDER_FAILURE = "ORDER_FAILURE";

const orderReducer = (state = initialState, action) => {
    switch(action.type){
        case MAKE_ORDER_FORM: {
            return{
                ...state,
                orderedItemList: action.data,
            }
        }
        case ORDER_REQUEST: {
            return {
                ...state,
                isCheckingOut: true,
            }
        }
        case ORDER_SUCCESS: {
            return {
                ...state,
                isCheckingOut: false,
            }
        }
        case ORDER_FAILURE: {
            return {
                ...state,
                isCheckingOut: false,
                errorReasonSaveTempOrder: action.error,
            }
        }
        default : {
            return {
                ...state,
            }
        }
    }
}

export default orderReducer;