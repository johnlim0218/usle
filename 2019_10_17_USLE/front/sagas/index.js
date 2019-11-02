import { all, fork } from 'redux-saga/effects';
import axios from 'axios';
import userSaga from './userSaga';
import adminProductSaga from './admin/adminProductSaga';

axios.defaults.baseURL = 'http://localhost:3065/api';

function* rootSaga() {
    yield all ([
        fork(userSaga),
        fork(adminProductSaga)
    ]);
}

export default rootSaga;