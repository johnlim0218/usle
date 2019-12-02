import { all, fork } from 'redux-saga/effects';
import axios from 'axios';
import userSaga from './userSaga';
import productSaga from './productSaga';
import cartSaga from './cartSaga';
import adminProductSaga from './admin/adminProductSaga';
import adminCategorySaga from './admin/adminCategorySaga';
import adminBrandSaga from './admin/adminBrandSaga';

axios.defaults.baseURL = 'http://localhost:3065/api';

function* rootSaga() {
    yield all ([
        fork(userSaga),
        fork(productSaga),
        fork(cartSaga),
        fork(adminProductSaga),
        fork(adminCategorySaga),
        fork(adminBrandSaga),
    ]);
}

export default rootSaga;