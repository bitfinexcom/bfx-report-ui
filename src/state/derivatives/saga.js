import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'

import { makeFetchCall } from 'state/utils'
import {
  formatRawSymbols, getPairsFromUrlParam, getSymbolsURL, mapPair, mapRequestPairs,
} from 'state/symbols/utils'
import { selectAuth } from 'state/auth/selectors'
import { updateErrorStatus } from 'state/status/actions'

import types from './constants'
import actions from './actions'
import { getTargetPairs } from './selectors'

function getReqDerivatives({ auth, targetPairs }) {
  const params = {}
  if (targetPairs.length) {
    params.symbol = formatRawSymbols(mapRequestPairs(targetPairs))
  }

  return makeFetchCall('getDerivatives', auth, params)
}

function* fetchDerivatives({ payload: pair }) {
  try {
    let targetPairs = yield select(getTargetPairs)
    const pairsUrl = getSymbolsURL(targetPairs)
    // set pair from url
    if (pair && pair !== pairsUrl) {
      targetPairs = getPairsFromUrlParam(pair).map(mapPair)
      yield put(actions.setTargetPairs(targetPairs))
    }
    const auth = yield select(selectAuth)
    const { result, error } = yield call(getReqDerivatives, {
      auth,
      targetPairs,
    })
    yield put(actions.updateDerivatives(result))

    if (!error) {
      yield put(actions.fetchFail({
        id: 'status.fail',
        topic: 'derivatives.title',
        detail: JSON.stringify(error),
      }))
    }
  } catch (fail) {
    yield put(actions.fetchFail({
      id: 'status.request.error',
      topic: 'derivatives.title',
      detail: JSON.stringify(fail),
    }))
  }
}

function* fetchDerivativesFail({ payload }) {
  yield put(updateErrorStatus(payload))
}

export default function* derivativesSaga() {
  yield takeLatest(types.FETCH_DERIVATIVES, fetchDerivatives)
  yield takeLatest(types.FETCH_FAIL, fetchDerivativesFail)
}
