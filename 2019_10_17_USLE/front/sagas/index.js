import { all, fork } from 'redux-saga/effects';
import axios from 'axios';
import userSaga from './userSaga';

axios.defaults.baseURL = 'http://localhost:3065/api';

function* rootSaga() {
    yield all ([
        fork(userSaga),
    ]);
}

export default rootSaga;