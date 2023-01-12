import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'

import { makeFetchCall } from 'state/utils'
import { formatRawSymbols, mapRequestPairs } from 'state/symbols/utils'
import { getFilterQuery } from 'state/filters/selectors'
import { updateErrorStatus } from 'state/status/actions'
import queryTypes from 'state/query/constants'

import types from './constants'
import actions from './actions'
import { getTargetPairs } from './selectors'

const TYPE = queryTypes.MENU_WEIGHTED_AVERAGES

function getReqDerivatives({ targetPairs, filter }) {
  const params = { filter }
  if (targetPairs.length) {
    params.symbol = formatRawSymbols(mapRequestPairs(targetPairs))
  }

  return makeFetchCall('getStatusMessages', params)
}

function* fetchDerivatives() {
  try {
    const targetPairs = yield select(getTargetPairs)
    const filter = yield select(getFilterQuery, TYPE)
    const { result, error } = yield call(getReqDerivatives, {
      targetPairs,
      filter,
    })
    yield put(actions.updateDerivatives(result))

    if (error) {
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
  yield takeLatest([types.FETCH_DERIVATIVES, types.CLEAR_PAIRS], fetchDerivatives)
  yield takeLatest(types.FETCH_FAIL, fetchDerivativesFail)
}
