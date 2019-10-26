
const initialState = {
    me: null, // 로그인한 사용자 정보
    isLogginIn : false, // 로그인 시도
    logInErrorReason : '', // 로그인 실패 이유
    isLoggingOut: false, // 로그아웃 시도
    logOutErrorReason: '', // 로그아웃 실패 이유
    isSigningUP : false, // 회원가입 시도
    signUpErrorReason : '', // 회원가입 실패 이유
};

export const LOG_IN_REQUEST = "LOG_IN_REQUEST";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "LOG_IN_FAILURE";

export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST";
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE";

export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";

const userReducer = (state = initialState, action) => {
    switch(action.type){
        case LOG_IN_REQUEST: {
            return {
                ...state,
                isLogginIn: true,
            }
        }
        case LOG_IN_SUCCESS: {
            return {
                ...state,
                isLogginIn: false,
                me: action.data,
            }
        }
        case LOG_IN_FAILURE: {
            return {
                ...state,
                isLogginIn: false,
                logInErrorReason: action.data,
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
            }
        }
        case LOG_OUT_FAILURE: {
            return {
                ...state,
                isLoggingOut: false,
            }
        }

        case SIGN_UP_REQUEST: {
            return {
                ...state,
                isSigningUP: true,
            }
        }
        case SIGN_UP_SUCCESS: {
            return {
                ...state,
                isSigningUP: false,
            }
        }
        case SIGN_UP_FAILURE: {
            return {
                ...state,
                isSigningUP: false,
            }
        }

        default:
            return {
                ...state,
            }   
    }
}

export default userReducer;