import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'

import { makeFetchCall } from 'state/utils'
import { updateErrorStatus } from 'state/status/actions'
import { frameworkCheck } from 'state/ui/saga'
import { getParams } from 'state/loanReport/selectors'
import { mapRequestSymbols } from 'state/symbols/utils'

import types from './constants'
import actions from './actions'

export const getLoanReport = ({
  start,
  end,
  timeframe,
  targetSymbols,
}) => {
  const params = { start, end, timeframe }
  if (targetSymbols.length) {
    params.symbol = mapRequestSymbols(targetSymbols)
  }
  return makeFetchCall('getPerformingLoan', params)
}

/* eslint-disable-next-line consistent-return */
export function* fetchLoanReport() {
  try {
    const shouldProceed = yield call(frameworkCheck)
    if (!shouldProceed) {
      // stop loading for first request
      return yield put(actions.updateLoanReport([]))
    }

    const params = yield select(getParams)

    const { result = [], error } = yield call(getLoanReport, params)
    yield put(actions.updateLoanReport(result))

    if (error) {
      yield put(actions.fetchFail({
        id: 'status.fail',
        topic: 'loanreport.title',
        detail: JSON.stringify(error),
      }))
    }
  } catch (fail) {
    yield put(actions.fetchFail({
      id: 'status.request.error',
      topic: 'loanreport.title',
      detail: JSON.stringify(fail),
    }))
  }
}

function* refreshLoanReport() {
  yield put(actions.fetchLoanReport())
}

function* fetchLoanReportFail({ payload }) {
  yield put(updateErrorStatus(payload))
}

export default function* tradedVolumeSaga() {
  yield takeLatest(types.FETCH_LOAN_REPORT, fetchLoanReport)
  yield takeLatest(types.REFRESH, refreshLoanReport)
  yield takeLatest(types.FETCH_FAIL, fetchLoanReportFail)
}
