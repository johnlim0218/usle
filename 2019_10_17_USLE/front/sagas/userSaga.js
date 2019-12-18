import { all, fork, call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
    LOG_IN_REQUEST,
    LOG_IN_SUCCESS,
    LOG_IN_FAILURE,
    SIGN_UP_REQUEST,
    SIGN_UP_SUCCESS,
    SIGN_UP_FAILURE,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAILURE,
    LOG_OUT_REQUEST,
    LOG_OUT_SUCCESS,
    LOAD_MY_ORDER_REQUEST,
    LOAD_MY_ORDER_SUCCESS,
    LOAD_MY_ORDER_FAILURE,
} from '../reducers/userReducer';
import { ALL_RESET_STATE } from '../reducers';


function* userSaga() {
    yield all([
        fork(watchLogIn), // fork는 비동기, call은 동기
        fork(watchLogOut),
        fork(watchSignUp),
        fork(watchLoadUser),
        fork(watchLoadMyOrder),
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

function logOutAPI(){
    return axios.post('/user/logout', {}, {
        withCredentials: true,
    })
}

function* logOut(){
    try{
        yield call(logOutAPI);
        yield put({
            type: LOG_OUT_SUCCESS,
        });
    } catch(e){
        console.error(e);
        yield put({
            type: LOG_IN_FAILURE,
            error: e,
        })
    }
}

function* watchLogOut(){
    yield takeLatest(LOG_OUT_REQUEST, logOut);
}

function loadUserAPI() {
    return axios.get('/user/', {
        withCredentials: true,
    })
}
function* loadUser(action){
    try{
        const result = yield call(loadUserAPI, action.data);
        
        yield put({
            type: LOAD_USER_SUCCESS,
            data: result.data !== '' ? result.data : null,
        })
    } catch(e) {
        yield put({
            type: LOAD_USER_FAILURE,
            error: e
        })
    }
}
function* watchLoadUser() {
    yield takeEvery(LOAD_USER_REQUEST, loadUser);
}

function loadMyOrderAPI(){
    return axios.get('/user/myOrder', {
        withCredentials: true,
    })
}
function* loadMyOrder(action){
    try{
        const result = yield call(loadMyOrderAPI);
        console.log(result);
        yield put({
            type: LOAD_MY_ORDER_SUCCESS,
            data: result.data,
        })
    } catch(e) {
        yield put({
            type: LOAD_MY_ORDER_FAILURE,
            error: e,
        })
    }
}
function* watchLoadMyOrder(){
    yield takeEvery(LOAD_MY_ORDER_REQUEST, loadMyOrder);
}

export default userSaga;