import { all, fork, call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { ORDER_REQUEST, ORDER_FAILURE, ORDER_SUCCESS } from '../reducers/orderReducer';

function* orderSaga() {
    yield all([
        fork(watchOrder),
    ])
}

function orderAPI(orderData){
    return axios.post('/order', orderData, {
        withCredentials: true
    })
}
function* order(action){
    try{
        const result = yield call(orderAPI, action.data);
        yield put({
            type: ORDER_SUCCESS,
            data: result.data,
        })
    } catch(e) {
        yield put({
            type: ORDER_FAILURE,
            error: e,
        })
    }
}
function* watchOrder(){
    yield takeLatest(ORDER_REQUEST, order);
}

export default orderSaga;