const initialState = {
    orderedItemList: [],
    isCheckingOut: false,
    ordered: null,
    errorReasonSaveTempOrder: '',
}

export const MAKE_ORDER_FORM = "MAKE_ORDER_FORM";
export const MAKE_AMOUNT_PER_ITEM = "MAKE_AMOUNT_PER_ITEM";
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
        case MAKE_AMOUNT_PER_ITEM: {
            const dataIndex = state.orderedItemList.findIndex(v => v.id === action.data.id);
            const orderItem = state.orderedItemList[dataIndex]; 
            state.orderedItemList[dataIndex] = {
                ...orderItem,
               amount : action.data.amount,
            }
            return{
                ...state,
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