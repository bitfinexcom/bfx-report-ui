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

function getReqDerivativesStatus({ auth, targetPairs }) {
  const params = {}
  if (targetPairs.length) {
    params.symbol = formatRawSymbols(mapRequestPairs(targetPairs))
  }

  return makeFetchCall('getDerivativesStatus', auth, params)
}

function* fetchDerivativesStatus({ payload: pair }) {
  try {
    let targetPairs = yield select(getTargetPairs)
    const pairsUrl = getSymbolsURL(targetPairs)
    // set pair from url
    if (pair && pair !== pairsUrl) {
      targetPairs = getPairsFromUrlParam(pair).map(mapPair)
      yield put(actions.setTargetPairs(targetPairs))
    }
    const auth = yield select(selectAuth)
    const { result, error } = yield call(getReqDerivativesStatus, {
      auth,
      targetPairs,
    })
    yield put(actions.updateDerivativesStatus(result))

    if (error) {
      yield put(actions.fetchFail({
        id: 'status.fail',
        topic: 'derivativesstatus.title',
        detail: JSON.stringify(error),
      }))
    }
  } catch (fail) {
    yield put(actions.fetchFail({
      id: 'status.request.error',
      topic: 'derivativesstatus.title',
      detail: JSON.stringify(fail),
    }))
  }
}

function* fetchDerivativesStatusFail({ payload }) {
  yield put(updateErrorStatus(payload))
}

export default function* derivativesStatusSaga() {
  yield takeLatest(types.FETCH_DERIVATIVES_STATUS, fetchDerivativesStatus)
  yield takeLatest(types.FETCH_FAIL, fetchDerivativesStatusFail)
}
