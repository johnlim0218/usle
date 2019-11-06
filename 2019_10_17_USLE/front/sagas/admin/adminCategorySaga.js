import { all, fork, call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { 
        NEW_CATEGORY_POST_REQUEST,
        NEW_CATEGORY_POST_SUCCESS,
        NEW_CATEGORY_POST_FAILURE,
        CATEGORIES_LOAD_REQUEST, 
        CATEGORIES_LOAD_SUCCESS, 
        CATEGORIES_LOAD_FAILURE,
        CATEGORIES_DELETE_REQUEST,
        CATEGORIES_DELETE_FAILURE,
        CATEGORIES_DELETE_SUCCESS,  
    } from '../../reducers/admin/adminCategoryReducer';

function* adminCategorySaga() {
    yield all([
        fork(watchCategoryPost),
        fork(watchCategoryLoad),
        fork(watchCategoryDelete),
    ])
}

function categoryPostAPI(newCategoryData){
    return axios.post('/category/add', newCategoryData, {
        withCredentials: true
    });
}
function* categoryPost(action){
    try{
        const result = yield call(categoryPostAPI, action.data);
        yield put({
            type: NEW_CATEGORY_POST_SUCCESS,
            data: result.data,
        })
    }catch(e){
        yield put({
            type: NEW_CATEGORY_POST_FAILURE,
            error: e,
        })
    }
}
function* watchCategoryPost(){
    yield takeLatest(NEW_CATEGORY_POST_REQUEST, categoryPost)
}

function categoriesLoadAPI(){
    return axios.get('/category/get', {
        withCredentials: true, 
    });
}
function* categoriesLoad(action){
    try{
        const result = yield call(categoriesLoadAPI, action.data)
        yield put({
            type: CATEGORIES_LOAD_SUCCESS,
            data: result.data,
        })
    }catch(e){
        yield put({
            type: CATEGORIES_LOAD_FAILURE,
            error: e,
        })
    }
}
function* watchCategoryLoad(){
    yield takeLatest(CATEGORIES_LOAD_REQUEST, categoriesLoad);
}

function categoryDeleteAPI(categoryId){
    return axios.delete(`/category/delete/${categoryId}`, {
        withCredentials: true,
    })
}
function* categoryDelete(action){
    try{
        yield call(categoryDeleteAPI, action.data);
        yield put({
            type: CATEGORIES_DELETE_SUCCESS,
            data: action.data,
        })
    }catch(e){
        yield put({
            type: CATEGORIES_DELETE_FAILURE,
        })
    }
}
function* watchCategoryDelete(){
    yield takeLatest(CATEGORIES_DELETE_REQUEST, categoryDelete);
}
export default adminCategorySaga;