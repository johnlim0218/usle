import { all, fork, call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { ADD_CART_REQUEST, ADD_CART_SUCCESS, LOAD_CART_REQUEST, LOAD_CART_FAILURE, LOAD_CART_SUCCESS } from '../reducers/cartReducer';

function* cartSaga(){
    yield all([
        fork(watchAddCart),
        fork(watchLoadCart),
    ]);
}

function addCartAPI(newCartData){
    return axios.post('/cart/add', newCartData);
}
function* addCart(action){
    try{
        const result = yield call(addCartAPI, action.data);
        yield put({
            type: ADD_CART_SUCCESS,
            data: result,
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
    return axios.get('/cart/get');
}
function* loadCart(){
    try {
        const result = yield call(loadCartAPI);
        console.log(result);
        yield put({
            type: LOAD_CART_SUCCESS,
            data: result,
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

export default cartSaga;