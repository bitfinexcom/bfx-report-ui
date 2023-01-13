import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'

import { makeFetchCall } from 'state/utils'
import { formatRawSymbols, mapRequestPairs } from 'state/symbols/utils'
import { getTimeFrame } from 'state/timeRange/selectors'
import { getFilterQuery } from 'state/filters/selectors'
import { updateErrorStatus } from 'state/status/actions'
import queryTypes from 'state/query/constants'

import types from './constants'
import actions from './actions'
import { getTargetPairs } from './selectors'

const TYPE = queryTypes.MENU_WEIGHTED_AVERAGES

function getWeightedAverages({
  targetPairs, filter, start, end,
}) {
  const params = { filter, start, end }
  if (targetPairs.length) {
    params.symbol = formatRawSymbols(mapRequestPairs(targetPairs))
  }

  return makeFetchCall('getWeightedAveragesReport', params)
}

function* fetchWeightedAverages() {
  try {
    const targetPairs = yield select(getTargetPairs)
    const { start, end } = yield select(getTimeFrame)
    const filter = yield select(getFilterQuery, TYPE)
    const { result, error } = yield call(getWeightedAverages, {
      targetPairs,
      filter,
      start,
      end,
    })

    console.log('++result', result)

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

function* fetchWeightedAveragesFail({ payload }) {
  yield put(updateErrorStatus(payload))
}

export default function* weightedAveragesSaga() {
  yield takeLatest([types.FETCH_WEIGHTED_AVERAGES, types.CLEAR_PAIRS], fetchWeightedAverages)
  yield takeLatest(types.FETCH_FAIL, fetchWeightedAveragesFail)
}
