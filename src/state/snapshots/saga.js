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

import types from './constants'
import actions from './actions'
import selectors from './selectors'

const getReqSnapshots = (auth, end) => {
  const params = end ? { end } : {}
  makeFetchCall('getFullSnapshotReport', auth, params)
}

/* eslint-disable-next-line consistent-return */
function* fetchSnapshots({ payload: end }) {
  try {
    const shouldProceed = yield call(frameworkCheck)
    if (!shouldProceed) {
      // stop loading for first request
      return yield put(actions.updateSnapshots())
    }
    // save current query time in state for csv export reference
    yield put(actions.setTimestamp(end))

    const auth = yield select(selectAuth)
    const { result = {}, error } = yield call(getReqSnapshots, auth, end)

    yield put(actions.updateSnapshots(result))

    if (error) {
      yield put(actions.fetchFail({
        id: 'status.fail',
        topic: 'snapshots.title',
        detail: JSON.stringify(error),
      }))
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
  yield call(fetchSnapshots, { payload: timestamp })
}

function* fetchSnapshotsFail({ payload }) {
  yield put(updateErrorStatus(payload))
}

export default function* snapshotsSaga() {
  yield takeLatest(types.FETCH_SNAPSHOTS, fetchSnapshots)
  yield takeLatest(types.REFRESH, refreshSnapshots)
  yield takeLatest(types.FETCH_FAIL, fetchSnapshotsFail)
}
