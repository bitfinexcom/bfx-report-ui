import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'

import { makeFetchCall } from 'state/utils'
import { toggleErrorDialog } from 'state/ui/actions'
import { updateErrorStatus } from 'state/status/actions'
import { getParams } from 'state/loanReport/selectors'
import { mapRequestSymbols } from 'state/symbols/utils'
import { getTimeFrame } from 'state/timeRange/selectors'

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
    const { timeframe, targetSymbols } = yield select(getParams)
    const { start, end } = yield select(getTimeFrame)

    const { result = [], error } = yield call(getLoanReport, {
      start,
      end,
      timeframe,
      targetSymbols,
    })
    yield put(actions.updateLoanReport(result))

    if (error) {
      yield put(toggleErrorDialog(true, error.message))
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

export default function* loanReportSaga() {
  yield takeLatest(types.FETCH_LOAN_REPORT, fetchLoanReport)
  yield takeLatest([types.REFRESH, types.CLEAR_SYMBOLS], refreshLoanReport)
  yield takeLatest(types.FETCH_FAIL, fetchLoanReportFail)
}
