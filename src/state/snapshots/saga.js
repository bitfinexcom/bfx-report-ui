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

export const getReqSnapshots = (end) => {
  const params = end ? { end } : {}
  return makeFetchCall('getFullSnapshotReport', params)
}

/* eslint-disable-next-line consistent-return */
export function* fetchSnapshots({ payload: end }) {
  try {
    const shouldProceed = yield call(frameworkCheck)
    if (!shouldProceed) {
      // stop loading for first request
      return yield put(actions.updateSnapshots())
    }
    // save current query time in state for csv export reference
    yield put(actions.setTimestamp(end))

    const { result = {}, error } = yield call(getReqSnapshots, end)

    yield put(actions.updateSnapshots(result))

    if (error) {
      yield put(toggleErrorDialog(true, error.message))
    }
  } catch (fail) {
    yield put(actions.fetchFail({
      id: 'status.request.error',
      topic: 'snapshots.title',
      detail: JSON.stringify(fail),
    }))
  }
}

function* refreshSnapshots() {
  const timestamp = yield select(selectors.getTimestamp)
  yield put(actions.fetchSnapshots(timestamp))
}

function* fetchSnapshotsFail({ payload }) {
  yield put(updateErrorStatus(payload))
}

export default function* snapshotsSaga() {
  yield takeLatest(types.FETCH_SNAPSHOTS, fetchSnapshots)
  yield takeLatest(types.REFRESH, refreshSnapshots)
  yield takeLatest(types.FETCH_FAIL, fetchSnapshotsFail)
}
