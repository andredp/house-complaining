import { all } from 'redux-saga/effects';
import { formSubmitSaga } from 'redux-form-submit-saga';
import authSagas from './auth';

function* rootSaga() {
  yield all([...authSagas, formSubmitSaga()]);
}

export default rootSaga;
