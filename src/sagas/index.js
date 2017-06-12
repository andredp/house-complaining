import { takeEvery, all } from 'redux-saga/effects';
import { formSubmitSaga } from 'redux-form-submit-saga';
import { authenticate, logout, validateToken } from './auth';

function* rootSaga() {
  yield all([
    takeEvery('AUTH_VALIDATE', validateToken),
    takeEvery('AUTH_LOGIN', authenticate),
    takeEvery('AUTH_LOGOUT', logout),
    formSubmitSaga(),
  ]);
}

export default rootSaga;
