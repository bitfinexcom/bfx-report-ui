import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'

import { makeFetchCall } from 'state/utils'
import { toggleErrorDialog } from 'state/ui/actions'
import { updateErrorStatus } from 'state/status/actions'
import { frameworkCheck } from 'state/ui/saga'

import types from './constants'
import actions from './actions'
import selectors from './selectors'

function getReqWallets(end) {
  const params = end ? { end } : {}
  return makeFetchCall('getWallets', params)
}

/* eslint-disable-next-line consistent-return */
function* fetchWallets({ payload: end }) {
  try {
    const shouldProceed = yield call(frameworkCheck)
    if (!shouldProceed) {
      // stop loading for first request
      return yield put(actions.updateWallets())
    }
    // save current query time in state for csv export reference
    yield put(actions.setTimestamp(end))

    const { result = [], error } = yield call(getReqWallets, end)
    yield put(actions.updateWallets(result))

    if (error) {
      yield put(toggleErrorDialog(true, error.message))
    }
  } catch (fail) {
    yield put(actions.fetchFail({
      id: 'status.request.error',
      topic: 'wallets.title',
      detail: JSON.stringify(fail),
    }))
  }
}

function* refreshWallets() {
  const timestamp = yield select(selectors.getTimestamp)
  yield put(actions.fetchWallets(timestamp))
}

function* fetchWalletsFail({ payload }) {
  yield put(updateErrorStatus(payload))
}

export default function* walletsSaga() {
  yield takeLatest(types.FETCH_WALLETS, fetchWallets)
  yield takeLatest(types.REFRESH, refreshWallets)
  yield takeLatest(types.FETCH_FAIL, fetchWalletsFail)
}
