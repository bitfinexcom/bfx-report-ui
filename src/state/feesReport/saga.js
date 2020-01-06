import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'

import { makeFetchCall } from 'state/utils'
import { updateErrorStatus } from 'state/status/actions'
import { frameworkCheck } from 'state/ui/saga'
import { getParams } from 'state/feesReport/selectors'
import { formatRawSymbols, mapRequestPairs } from 'state/symbols/utils'

import types from './constants'
import actions from './actions'

export const getFeesReport = ({
  start,
  end,
  timeframe,
  targetPairs,
}) => {
  const params = { start, end, timeframe }
  if (targetPairs.length) {
    params.symbol = formatRawSymbols(mapRequestPairs(targetPairs))
  }
  return makeFetchCall('getFeesReport', params)
}

/* eslint-disable-next-line consistent-return */
export function* fetchFeesReport() {
  try {
    const shouldProceed = yield call(frameworkCheck)
    if (!shouldProceed) {
      // stop loading for first request
      return yield put(actions.updateFeesReport([]))
    }

    const params = yield select(getParams)

    const { result = [], error } = yield call(getFeesReport, params)
    yield put(actions.updateFeesReport(result))

    if (error) {
      yield put(actions.fetchFail({
        id: 'status.fail',
        topic: 'feesreport.title',
        detail: JSON.stringify(error),
      }))
    }
  } catch (fail) {
    yield put(actions.fetchFail({
      id: 'status.request.error',
      topic: 'feesreport.title',
      detail: JSON.stringify(fail),
    }))
  }
}

function* refreshFeesReport() {
  yield put(actions.fetchFeesReport())
}

function* fetchFeesReportFail({ payload }) {
  yield put(updateErrorStatus(payload))
}

export default function* feesReportSaga() {
  yield takeLatest(types.FETCH_FEES_REPORT, fetchFeesReport)
  yield takeLatest(types.REFRESH, refreshFeesReport)
  yield takeLatest(types.FETCH_FAIL, fetchFeesReportFail)
}
