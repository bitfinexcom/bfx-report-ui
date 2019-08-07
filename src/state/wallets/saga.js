import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'

import { makeFetchCall } from 'state/utils'
import { selectAuth } from 'state/auth/selectors'
import { updateErrorStatus } from 'state/status/actions'
import { frameworkCheck } from 'state/ui/saga'
import { platform } from 'var/config'

import types from './constants'
import actions from './actions'
import selectors from './selectors'

function getReqWallets(auth, end) {
  const params = end ? { end } : {}
  return makeFetchCall('getWallets', auth, params)
}

/* eslint-disable-next-line consistent-return */
function* fetchWallets({ payload: end }) {
  const walletsTitle = platform.showFrameworkMode ? 'wallets.title' : 'wallets.title_beta'
  try {
    const shouldProceed = yield call(frameworkCheck)
    if (!shouldProceed) {
      // stop loading for first request
      return yield put(actions.updateWallets())
    }
    // save current query time in state for csv export reference
    yield put(actions.setTimestamp(end))

    const auth = yield select(selectAuth)
    const { result = [], error } = yield call(getReqWallets, auth, end)
    yield put(actions.updateWallets(result))

    if (error) {
      yield put(actions.fetchFail({
        id: 'status.fail',
        topic: walletsTitle,
        detail: JSON.stringify(error),
      }))
    }
  } catch (fail) {
    yield put(actions.fetchFail({
      id: 'status.request.error',
      topic: walletsTitle,
      detail: JSON.stringify(fail),
    }))
  }
}

function* refreshWallets() {
  const timestamp = yield select(selectors.getTimestamp)
  yield call(fetchWallets, { payload: timestamp })
}

function* fetchWalletsFail({ payload }) {
  yield put(updateErrorStatus(payload))
}

export default function* walletsSaga() {
  yield takeLatest(types.FETCH_WALLETS, fetchWallets)
  yield takeLatest(types.REFRESH, refreshWallets)
  yield takeLatest(types.FETCH_FAIL, fetchWalletsFail)
}
