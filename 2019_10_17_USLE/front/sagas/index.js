import { all, fork } from 'redux-saga/effects';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3065/api';

function* rootSaga() {
    yield all ([

    ]);
}

export default rootSaga;