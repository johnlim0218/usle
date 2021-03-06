const initialState = {
    me: null, // 로그인한 사용자 정보
    isLoggingIn : false, // 로그인 시도
    logInErrorReason : '', // 로그인 실패 이유
    isLoggingOut: false, // 로그아웃 시도
    logOutErrorReason: '', // 로그아웃 실패 이유
    isSigningUp : false, // 회원가입 시도
    signUpResult: null,
    signUpErrorReason : '', // 회원가입 실패 이유
    isLoadingUser : false,
    loadUserErrorReason : '',
    isLoadingMyOrder : false,
    myOrderList : [],
    loadMyOrderErrorReason : '',
};

export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";

export const LOG_IN_REQUEST = "LOG_IN_REQUEST";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "LOG_IN_FAILURE";

export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST";
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE";

export const LOAD_USER_REQUEST = "LOAD_USER_REQUEST";
export const LOAD_USER_SUCCESS = "LOAD_USER_SUCCESS";
export const LOAD_USER_FAILURE = "LOAD_USER_FAILURE";

export const LOAD_MY_ORDER_REQUEST = "LOAD_MY_ORDER_REQUEST";
export const LOAD_MY_ORDER_SUCCESS = "LOAD_MY_ORDER_SUCCESS";
export const LOAD_MY_ORDER_FAILURE = "LOAD_MY_ORDER_FAILURE";

const userReducer = (state = initialState, action) => {
    switch(action.type){
        case SIGN_UP_REQUEST: {
            return {
                ...state,
                isSigningUp: true,
            }
        }
        case SIGN_UP_SUCCESS: {
            return {
                ...state,
                isSigningUp: false,
                signUpResult: action.data,
            }
        }
        case SIGN_UP_FAILURE: {
            return {
                ...state,
                isSigningUp: false,
                signUpErrorReason: action.error.response.data,
            }
        }

        case LOG_IN_REQUEST: {
            return {
                ...state,
                isLoggingIn: true,
            }
        }
        case LOG_IN_SUCCESS: {
            return {
                ...state,
                isLoggingIn: false,
                me: action.data,
            }
        }
        case LOG_IN_FAILURE: {
            return {
                ...state,
                isLoggingIn: false,
                logInErrorReason: action.error.response.data,
            }
        }

        case LOG_OUT_REQUEST: {
            return {
                ...state,
                isLoggingOut: true,
            }
        }
        case LOG_OUT_SUCCESS: {
            return {
                ...state,
                isLoggingOut: false,
                me: null,
            }
        }
        case LOG_OUT_FAILURE: {
            return {
                ...state,
                isLoggingOut: false,
                logInErrorReason: action.error.response.data,
            }
        }

        case LOAD_USER_REQUEST: {
            return {
                ...state,
                isLoadingUser: true,
            }
        }
        case LOAD_USER_SUCCESS: {
            return {
                ...state,
                isLoadingUser: false,
                me: action.data,
            }
        }
        case LOAD_USER_FAILURE: {
            return {
                ...state,
                isLoadingUser: false,
                loadUserErrorReason: action.error.response.data,
            }
        }
        case LOAD_MY_ORDER_REQUEST:{
            return{
                ...state,
                isLoadingMyOrder: true,
                myOrderList: [],
            }
        }
        case LOAD_MY_ORDER_SUCCESS:{
            return{
                ...state,
                isLoadingMyOrder: false,
                myOrderList: action.data,
            }
        }
        case LOAD_MY_ORDER_FAILURE:{
            return{
                ...state,
                isLoadingMyOrder: true,
                loadMyOrderErrorReason: action.error,
            }
        }
        
        default:
            return {
                ...state,
            }   
    }
}

export default userReducer;