import { all, fork, call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
    LOG_IN_REQUEST,
    LOG_IN_SUCCESS,
    LOG_IN_FAILURE,
    SIGN_UP_REQUEST,
    SIGN_UP_SUCCESS,
    SIGN_UP_FAILURE,
} from '../reducers/userReducer';


function* userSaga() {
    yield all([
        fork(watchLogIn), // fork는 비동기, call은 동기
        fork(watchSignUp),
    ]);
}

function signUpAPI(signUpData){
    return axios.post('/user/signup', signUpData);
}

function* signUp(action) {
    try{
        const result = yield call(signUpAPI, action.data);
        yield put({
            type: SIGN_UP_SUCCESS,
            data: result.data,
        })
    } catch(e) {
        yield put({
            type: SIGN_UP_FAILURE,
            error: e,
        })
    }
}

function* watchSignUp() {
    yield takeLatest(SIGN_UP_REQUEST, signUp);
}

function logInAPI(loginData){
    return axios.post('/user/login', loginData, {
        withCredentials: true,
    })
}

function* logIn(action) {
    try{
        const result = yield call(logInAPI, action.data);
        yield put({
            type: LOG_IN_SUCCESS,
            data: result.data,
        })
    } catch(e) {
        yield put({
            type: LOG_IN_FAILURE,
            error: e,
        })
    }
}

function* watchLogIn() {
    yield takeEvery(LOG_IN_REQUEST, logIn);
}


export default userSaga;