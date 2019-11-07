import { all, fork, call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { NEW_BRAND_POST_REQUEST, 
        NEW_BRAND_POST_FAILURE, 
        NEW_BRAND_POST_SUCCESS, 
        BRANDS_LOAD_REQUEST, 
        BRANDS_LOAD_SUCCESS,
        BRANDS_LOAD_FAILURE, 
        BRAND_DELETE_REQUEST,
        BRAND_DELETE_SUCCESS,
        BRAND_DELETE_FAILURE} from '../../reducers/admin/adminBrandReducer';

function* adminBrandSaga() {
    yield all([
        fork(watchBrandPost),
        fork(watchBrandsLoad),
        fork(watchBrandDelete),
    ])
}

function brandsLoadAPI(type){
    return axios.get(`/brand/get/${type}`, {
        withCredentials: true,
    })
}
function* brandsLoad(action){
    try{
        const result = yield call(brandsLoadAPI, action.data.requestType);
        yield put({
            type: BRANDS_LOAD_SUCCESS,
            data: result.data,
        })
    } catch(e) {
        yield put({
            type: BRANDS_LOAD_FAILURE,
            error: e,
        })
    }
}
function* watchBrandsLoad(){
    yield takeLatest(BRANDS_LOAD_REQUEST, brandsLoad)
}

function brandPostAPI(newBrandData){
    return axios.post('/brand/add', newBrandData, {
        withCredentials: true,
    })
}
function* brandPost(action){
    try {
        const result = yield call(brandPostAPI, action.data);
        yield put({
            type: NEW_BRAND_POST_SUCCESS,
            data: result.data,
        })
    } catch(e) {
        yield put({
            type: NEW_BRAND_POST_FAILURE,
            data: e,
        })
    }
}
function* watchBrandPost(){
    yield takeLatest(NEW_BRAND_POST_REQUEST, brandPost);
}


function brandDeleteAPI(brandId){
    return axios.delete(`/brand/delete/${brandId}`, {
        withCredentials: true,
    })
}
function* brandDelete(action) {
    try{
        yield call(brandDeleteAPI, action.data);
        yield put({
            type: BRAND_DELETE_SUCCESS,
            data: action.data,
        })
    } catch(e) {
        yield put({
            type: BRAND_DELETE_FAILURE,
        })
    }
}
function* watchBrandDelete() {
    yield takeLatest(BRAND_DELETE_REQUEST, brandDelete);
}

export default adminBrandSaga;