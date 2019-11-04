import { all, fork, call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { NEW_PRODUCT_POST_REQUEST, NEW_PRODUCT_POST_SUCCESS, NEW_PRODUCT_POST_FAILURE } from '../../reducers/admin/adminProductReducer';

function* adminProductSaga() {
    yield all([
        fork(watchProductPost),
    ])
}

function productPostAPI(newProductData){
    return axios.post('/product/add', newProductData);
}
function* productPost(action){
    try{
        yield call(productPostAPI, action.data)
        yield put({
            type: NEW_PRODUCT_POST_SUCCESS,
        })
    }catch(e){
        yield put({
            type: NEW_PRODUCT_POST_FAILURE,
            error: e,
        })
    }
}
function* watchProductPost(){
    yield takeLatest(NEW_PRODUCT_POST_REQUEST, productPost)
}

export default adminProductSaga;