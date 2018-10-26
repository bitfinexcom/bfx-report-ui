import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'
import { delay } from 'redux-saga'

import { setAuthToken, setTimezone } from 'state/base/actions'
import { selectAuth } from 'state/auth/selectors'
import { getAuthToken, getTimezone } from 'state/base/selectors'
import { getAuth, checkEmail, makeFetchCall } from 'state/utils'
import { updateErrorStatus, updateSuccessStatus } from 'state/status/actions'
import { setOwnerEmail } from 'state/query/actions'
import { platform } from 'var/config'

import types from './constants'
import actions from './actions'

const LOCAL_AUTHTOKEN = 'local'

const getUsersTimeConf = auth => makeFetchCall('getUsersTimeConf', auth)
const updateSyncErrorStatus = msg => updateErrorStatus({
  id: 'status.request.error',
  topic: 'auth.auth',
  detail: JSON.stringify(msg),
})

function* checkAuth({ payload: flag }) {
  try {
    const auth = yield select(selectAuth)
    const data = yield call(getAuth, auth)
    const { result = false, error } = data
    if (result) {
      yield put(updateSuccessStatus({
        id: 'status.success',
        topic: 'auth.auth',
        time: (new Date()).toLocaleString(),
      }))

      // get owner email
      yield delay(300)
      const { result: ownerEmail, error: emailError } = yield call(checkEmail, auth)
      if (ownerEmail) {
        yield put(setOwnerEmail(ownerEmail))
      }

      if (emailError) {
        yield put(updateSyncErrorStatus(emailError))
      }

      // non sync mode
      if (!platform.showSyncMode) {
        // get default timezone
        const currentTimezone = yield select(getTimezone)
        if (!currentTimezone) {
          yield delay(300)
          const { result: tz, error: tzError } = yield call(getUsersTimeConf, auth)
          if (tz) {
            yield put(setTimezone(tz.timezoneName))
          }

          if (tzError) {
            yield put(updateSyncErrorStatus(tzError))
          }
        }

        yield put(actions.hideAuth())
      }
    }
    yield put(actions.updateAuthStatus(result))

    if (result === false && flag === LOCAL_AUTHTOKEN) {
      yield put(actions.logout())
    }

    if (error) {
      yield put(updateErrorStatus({
        id: 'status.fail',
        topic: 'auth.auth',
        detail: JSON.stringify(error),
      }))
    }
  } catch (fail) {
    yield put(updateSyncErrorStatus(fail))
  }
}

function* checkAuthWithToken({ payload: authToken }) {
  try {
    yield put(setAuthToken(authToken))
    yield put(actions.checkAuth())
  } catch (fail) {
    yield put(updateSyncErrorStatus(fail))
  }
}

function* checkAuthWithLocalToken() {
  try {
    const authToken = yield select(getAuthToken)
    if (authToken) {
      yield put(actions.checkAuth(LOCAL_AUTHTOKEN))
    }
  } catch (fail) {
    yield put(updateSyncErrorStatus(fail))
  }
}

export default function* authSaga() {
  yield takeLatest(types.CHECK_AUTH, checkAuth)
  yield takeLatest(types.CHECK_AUTH_WITH_TOKEN, checkAuthWithToken)
  yield takeLatest(types.CHECK_AUTH_WITH_LOCAL_TOKEN, checkAuthWithLocalToken)
}
