import { all } from 'redux-saga/effects';
import { formSubmitSaga } from 'redux-form-submit-saga';
import createAuthSagas from './auth';

function* rootSaga(dispatch) {
  yield all([...createAuthSagas(dispatch), formSubmitSaga()]);
}

export default rootSaga;
