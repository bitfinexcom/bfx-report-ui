import { fork } from 'redux-saga/effects'
import authSaga from './auth/saga'
import ledgersSaga from './ledgers/saga'

export default function* rootSaga() {
  yield fork(authSaga)
  yield fork(ledgersSaga)
}
