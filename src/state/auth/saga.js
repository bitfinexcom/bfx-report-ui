import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'
import _keys from 'lodash/keys'

import WS from 'state/ws'
import { setTimezone } from 'state/base/actions'
import { selectAuth } from 'state/auth/selectors'
import { getTimezone } from 'state/base/selectors'
import { getAuth, checkEmail, makeFetchCall } from 'state/utils'
import { updateErrorStatus, updateSuccessStatus } from 'state/status/actions'
import { fetchSymbols } from 'state/symbols/actions'
import { setOwnerEmail } from 'state/query/actions'
import { platform } from 'var/config'

import types from './constants'
import actions from './actions'

const getUsersTimeConf = auth => makeFetchCall('getUsersTimeConf', auth)
const updateSyncErrorStatus = msg => updateErrorStatus({
  id: 'status.request.error',
  topic: 'auth.auth',
  detail: JSON.stringify(msg),
})

function* checkAuth() {
  try {
    const auth = yield select(selectAuth)
    if (!_keys(auth).filter(key => auth[key]).length) {
      yield put(actions.updateAuthStatus())
      return
    }

    const { result = false, error } = yield call(getAuth, auth)
    if (result) {
      yield put(updateSuccessStatus({
        id: 'status.success',
        topic: 'auth.auth',
        time: (new Date()).toLocaleString(),
      }))

      yield put(actions.authSuccess(result))

      yield WS.connect()

      // fetch symbols if framework mode is not enabled
      if (!platform.showFrameworkMode) {
        yield put(fetchSymbols())
      }

      // get owner email
      const { result: ownerEmail, error: emailError } = yield call(checkEmail, auth)
      if (ownerEmail) {
        yield put(setOwnerEmail(ownerEmail))
      }

      if (emailError) {
        yield put(updateSyncErrorStatus(emailError))
      }

      // non framework mode
      if (!platform.showFrameworkMode) {
        // get default timezone
        const currentTimezone = yield select(getTimezone)
        if (!currentTimezone) {
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

      yield put(actions.hideAuth())
    } else {
      const { authToken } = auth

      yield put(actions.logout())

      if (authToken) {
        const { apiKey, apiSecret } = yield select(selectAuth)
        if (apiKey && apiSecret) {
          yield call(checkAuth)
          return
        }
      }

      yield put(actions.updateAuthStatus(result))
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

export default function* authSaga() {
  yield takeLatest(types.CHECK_AUTH, checkAuth)
}
