import { all, fork, call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { NEW_PRODUCT_POST_REQUEST, 
        NEW_PRODUCT_POST_SUCCESS, 
        NEW_PRODUCT_POST_FAILURE, 
        UPLOAD_IMAGES_REQUEST, 
        UPLOAD_IMAGES_SUCCESS, 
        UPLOAD_IMAGES_FAILURE, 
    } from '../../reducers/admin/adminProductReducer';

function* adminProductSaga() {
    yield all([
        fork(watchProductPost),
        fork(watchUploadImages),
    ])
}

function productPostAPI(newProductData){
    return axios.post('/product/add', newProductData);
}
function* productPost(action){
    try{
        const result = yield call(productPostAPI, action.data)
        yield put({
            type: NEW_PRODUCT_POST_SUCCESS,
            data: result,
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

function uploadImagesAPI(formData){
    return axios.post('/product/add/images', formData, {
        withCredentials: true,
    })
}
function* uploadImages(action){
    try{
        const result = yield call(uploadImagesAPI, action.data);
        yield put({
            type: UPLOAD_IMAGES_SUCCESS,
            data: result.data,
        })
    } catch(e) {
        console.error(e);
        yield put({
            type: UPLOAD_IMAGES_FAILURE,
            error: e,
        })
    }
}
function* watchUploadImages(){
    yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages);
}

export default adminProductSaga;