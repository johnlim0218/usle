import { all, fork, call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { ADD_CART_REQUEST, ADD_CART_SUCCESS, LOAD_CART_REQUEST, LOAD_CART_FAILURE, LOAD_CART_SUCCESS, REMOVE_CART_REQUEST, REMOVE_CART_SUCCESS, REMOVE_CART_FAILURE } from '../reducers/cartReducer';

function* cartSaga(){
    yield all([
        fork(watchAddCart),
        fork(watchLoadCart),
        fork(watchRemoveCart),
    ]);
}

function addCartAPI(newCartData){
    return axios.post('/cart/add', newCartData, {
        withCredentials: true
    });
}
function* addCart(action){
    try{
        const result = yield call(addCartAPI, action.data);
        yield put({
            type: ADD_CART_SUCCESS,
            data: result.data,
        })
    } catch(e) {
        yield put({
            type: ADD_CART_FAILURE,
            error: e,
        })
    }
}
function* watchAddCart(){
    yield takeLatest(ADD_CART_REQUEST, addCart);
}

function loadCartAPI(){
    return axios.get('/cart/get', {
        withCredentials: true
    });
}
function* loadCart(){
    try {
        const result = yield call(loadCartAPI);
        yield put({
            type: LOAD_CART_SUCCESS,
            data: result.data !== '' ? result.data : null,
        })
    } catch(e) {
        yield put({
            type: LOAD_CART_FAILURE,
            error: e,
        })
    }
}
function* watchLoadCart(){
    yield takeEvery(LOAD_CART_REQUEST, loadCart);
}

function removeCartAPI(removeDataId) {
    return axios.delete(`/cart/remove/${removeDataId}`, { 
        withCredentials: true
    });
}
function* removeCart(action){
    try{
        const result = yield call(removeCartAPI, action.data);
        yield put({
            type: REMOVE_CART_SUCCESS,
            data: action.data,
        })
    } catch(e) {
        yield put({
            type: REMOVE_CART_FAILURE,
            error: e,
        })
    }
}
function* watchRemoveCart(){
    yield takeLatest(REMOVE_CART_REQUEST, removeCart);
}

export default cartSaga;