import { all, fork, call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { LOAD_PRODUCTS_REQUEST,
        LOAD_PRODUCTS_SUCCESS,
        LOAD_PRODUCTS_FAILURE, 
        LOAD_PRODUCT_DETAIL_REQUEST,
        LOAD_PRODUCT_DETAIL_FAILURE,
        LOAD_PRODUCT_DETAIL_SUCCESS} from '../reducers/productReducer';

function* productSaga(){
    yield all([
        fork(watchLoadProducts),
        fork(watchLoadProductDetail),
    ])
}

function loadProductsAPI(){
    return axios.get('/products', {
        withCredentials: true
    });
}
function* loadProducts(action){
    try{
        const result = yield call(loadProductsAPI, action.data);
        yield put({
            type: LOAD_PRODUCTS_SUCCESS,
            data: result.data,
        })
    } catch(e) {
        yield put({
            type: LOAD_PRODUCTS_FAILURE,
            error: e,   
        })
    }
}
function* watchLoadProducts(){
    yield takeEvery(LOAD_PRODUCTS_REQUEST, loadProducts);   
}

function loadProductDetailAPI(productId){
    return axios.get(`/product/${productId}` ,{
        withCredentials: true
    });
}
function* loadProductDetail(action){
    try{
        const result = yield call(loadProductDetailAPI, action.data);
        yield put({
            type: LOAD_PRODUCT_DETAIL_SUCCESS,
            data: result.data,
        })
    } catch(e) {
        yield put({
            type: LOAD_PRODUCT_DETAIL_FAILURE,
            error: e,
        })
    }
}
function* watchLoadProductDetail(){
    yield takeEvery(LOAD_PRODUCT_DETAIL_REQUEST, loadProductDetail);
}
export default productSaga;