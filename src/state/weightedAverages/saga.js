import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'
import _isEmpty from 'lodash/isEmpty'

import { makeFetchCall } from 'state/utils'
import { getTimeFrame } from 'state/timeRange/selectors'
import { updateErrorStatus } from 'state/status/actions'
import { formatRawSymbols, mapRequestPairs } from 'state/symbols/utils'

import types from './constants'
import actions from './actions'
import { getTargetPairs } from './selectors'

function getWeightedAverages({ targetPairs, start, end }) {
  const params = { start, end }
  if (!_isEmpty.targetPairs) {
    params.symbol = formatRawSymbols(mapRequestPairs(targetPairs))
  }

  return makeFetchCall('getWeightedAveragesReport', params)
}

function* fetchWeightedAverages() {
  try {
    const targetPairs = yield select(getTargetPairs)
    const { start, end } = yield select(getTimeFrame)
    const { result, error } = yield call(getWeightedAverages, {
      end,
      start,
      targetPairs,
    })

    yield put(actions.updateWeightedAwerages(result))

    if (error) {
      yield put(actions.fetchFail({
        id: 'status.fail',
        topic: 'weightedaverages.title',
        detail: JSON.stringify(error),
      }))
    }
  } catch (fail) {
    yield put(actions.fetchFail({
      id: 'status.request.error',
      topic: 'weightedaverages.title',
      detail: JSON.stringify(fail),
    }))
  }
}

function* fetchWeightedAveragesFail({ payload }) {
  yield put(updateErrorStatus(payload))
}

export default function* weightedAveragesSaga() {
  yield takeLatest([types.FETCH_WEIGHTED_AVERAGES, types.CLEAR_PAIRS], fetchWeightedAverages)
  yield takeLatest(types.FETCH_FAIL, fetchWeightedAveragesFail)
}
