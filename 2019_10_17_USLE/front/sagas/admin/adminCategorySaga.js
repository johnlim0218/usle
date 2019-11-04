import { all, fork, call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { 
        NEW_CATEGORY_POST_REQUEST,
        NEW_CATEGORY_POST_SUCCESS,
        NEW_CATEGORY_POST_FAILURE,
        CATEGORIES_LOAD_REQUEST, 
        CATEGORIES_LOAD_SUCCESS, 
        CATEGORIES_LOAD_FAILURE,  
    } from '../../reducers/admin/adminCategoryReducer';

function* adminCategorySaga() {
    yield all([
        fork(watchCategoryPost),
        fork(watchCategoryGet),
    ])
}

function categoryPostAPI(){
    return axios.post('/category/get', );
}
function* categoryPost(action){
    try{
        yield call(categoryPostAPI, action.data)
        yield put({
            type: NEW_CATEGORY_POST_SUCCESS,
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
        console.log(result);
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
function* watchCategoryGet(){
    yield takeLatest(CATEGORIES_LOAD_REQUEST, categoriesLoad)
}

export default adminCategorySaga;