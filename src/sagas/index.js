import { all } from 'redux-saga/effects';
import { authenticate, logout, validateToken } from './auth';

export default function* rootSaga() {
  yield all([validateToken(), authenticate(), logout()]);
}
