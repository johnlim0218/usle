import { all, fork, call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { NEW_PRODUCT_POST_REQUEST, 
        NEW_PRODUCT_POST_SUCCESS, 
        NEW_PRODUCT_POST_FAILURE, 
        UPLOAD_IMAGES_REQUEST, 
        UPLOAD_IMAGES_SUCCESS, 
        UPLOAD_IMAGES_FAILURE, 
        SEARCH_OPTION_NAME_REQUEST,
        SEARCH_OPTION_NAME_SUCCESS,
        SEARCH_OPTION_NAME_FAILURE,
    } from '../../reducers/admin/adminProductReducer';

function* adminProductSaga() {
    yield all([
        fork(watchProductPost),
        fork(watchUploadImages),
        fork(watchSearchOptionName),
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


function searchOptionNameAPI(optionName){
    return axios.get(`/product/option/name/${optionName}`, {
        withCredentials: true,
    })
}
function* searchOptionName(action){
    try{
        const result = yield call(searchOptionNameAPI, action.data);
        
        yield put({
            type: SEARCH_OPTION_NAME_SUCCESS,
            data: result.data ? result.data : {optionName: action.data},
        })
    } catch(e){
        console.error(e);
        yield put({
            type: SEARCH_OPTION_NAME_FAILURE,
            error: e,
        })
    }
}
function* watchSearchOptionName(){
    yield takeEvery(SEARCH_OPTION_NAME_REQUEST, searchOptionName);
}

export default adminProductSaga;