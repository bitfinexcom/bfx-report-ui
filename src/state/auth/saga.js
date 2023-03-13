import {
  call,
  fork,
  take,
  race,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'
import { delay } from 'redux-saga'
import _last from 'lodash/last'
import _isArray from 'lodash/isArray'
import _isEmpty from 'lodash/isEmpty'
import _isEqual from 'lodash/isEqual'

import WS from 'state/ws'
import wsTypes from 'state/ws/constants'
import wsSignIn from 'state/ws/signIn'
import { selectAuth, getLoginToken } from 'state/auth/selectors'
import { formatAuthDate, makeFetchCall, postJsonFetch } from 'state/utils'
import tokenRefreshSaga from 'state/auth/tokenRefresh/saga'
import { togglePreferencesDialog } from 'state/ui/actions'
import { updateErrorStatus, updateSuccessStatus } from 'state/status/actions'
import { fetchSymbols } from 'state/symbols/actions'
import { refreshToken, tokenRefreshStart, tokenRefreshStop } from 'state/auth/tokenRefresh/actions'
import config from 'config'

import types from './constants'
import actions from './actions'

const updateAuthErrorStatus = msg => updateErrorStatus({
  id: 'status.request.error',
  topic: 'auth.auth',
  detail: JSON.stringify(msg),
})

function* onAuthSuccess(result) {
  try {
    yield put(actions.updateAuth(result))
    yield put(fetchSymbols())

    if (config.showFrameworkMode) {
      if (!WS.isConnected) {
        WS.connect()

        const { connectTimeout } = yield race({
          wsConnect: take(wsTypes.WS_CONNECT),
          connectTimeout: delay(3000),
        })

        if (connectTimeout) {
          yield put(updateAuthErrorStatus())
          yield put(actions.updateAuthStatus())
          return
        }
      }

      const wsAuth = yield call(wsSignIn)
      if (!wsAuth) {
        yield put(updateAuthErrorStatus())
        yield put(actions.updateAuthStatus())

        return
      }
    } else {
      // on app load try to refresh the token in case user refreshed the page and some time have already passed
      yield put(refreshToken())
      yield put(tokenRefreshStart())
    }

    yield put(updateSuccessStatus({
      id: 'status.success',
      topic: 'auth.auth',
      time: formatAuthDate(new Date()),
    }))

    yield put(actions.authSuccess(result))
    yield put(actions.hideAuth())
  } catch (fail) {
    yield put(updateAuthErrorStatus(fail))
  }
}

function* signUp({ payload }) {
  try {
    const {
      authToken,
      apiKey,
      apiSecret,
      password,
      isNotProtected,
    } = payload

    const authParams = {
      authToken,
      apiKey,
      apiSecret,
      password: isNotProtected ? undefined : password,
      isNotProtected: config.showFrameworkMode ? isNotProtected : undefined,
    }

    const method = config.showFrameworkMode ? 'signUp' : 'verifyUser'
    const { result, error } = yield call(makeFetchCall, method, null, authParams)

    if (result) {
      yield call(onAuthSuccess, { ...payload, ...result })
      const { email, isSubAccount } = result
      const newUser = {
        email,
        isSubAccount,
        isNotProtected,
      }
      yield put(actions.addUser(newUser))
      yield put(actions.showOtpLogin(false))
      return
    }

    yield put(actions.updateAuthStatus())

    if (error) {
      if (authToken) {
        yield put(actions.updateAuth({ authToken: '' }))
      }

      if (config.showFrameworkMode) {
        yield put(updateErrorStatus({
          id: 'status.signUpFail',
        }))
      } else {
        yield put(updateErrorStatus({
          id: 'status.fail',
          topic: 'auth.auth',
          detail: JSON.stringify(error),
        }))
      }
    }
  } catch (fail) {
    yield put(updateAuthErrorStatus(fail))
  }
}

function* signUpEmail({ payload }) {
  try {
    const { login, password } = payload
    const response = yield call(
      postJsonFetch,
      types.LOGIN_URL,
      { login, password },
    )

    if (_isArray(response)) {
      if (_isEqual(response?.[0], types.LOGIN_ERROR)) {
        yield put(updateErrorStatus({
          id: 'auth.loginEmail.loginEmailError',
        }))
      } else {
        const [loginToken, twoFaTypes] = response
        const [twoFaMain] = _last(twoFaTypes)
        if (_isEqual(twoFaMain, types.LOGIN_2FA_OTP)) {
          yield put(actions.setLoginToken(loginToken))
          yield put(actions.showOtpLogin(true))
        } else {
          yield put(updateErrorStatus({
            id: 'auth.loginEmail.loginEmailNo2FA',
          }))
        }
      }
    }
  } catch (fail) {
    yield put(updateAuthErrorStatus(fail))
  }
}

function* signUpOTP({ payload }) {
  try {
    const { otp, password, isNotProtected } = payload
    const loginToken = yield select(getLoginToken)
    const response = yield call(
      postJsonFetch,
      types.LOGIN_VERIFY_URL,
      { loginToken, token: otp, verifyMethod: types.LOGIN_2FA_OTP },
    )

    if (_isArray(response)) {
      if (_isEqual(response?.[0], types.LOGIN_ERROR)) {
        yield put(updateErrorStatus({
          id: 'auth.2FA.invalidToken',
        }))
      } else {
        const [bfxToken] = response
        const authParams = {
          authToken: bfxToken,
          password,
          isNotProtected,
        }
        yield put(actions.signUp(authParams))
      }
    }
  } catch (fail) {
    yield put(updateAuthErrorStatus(fail))
  }
}

function* signIn({ payload }) {
  try {
    const {
      email,
      isNotProtected,
      isSubAccount,
      password,
    } = payload

    const authParams = {
      email,
      password: isNotProtected ? undefined : password,
      isSubAccount,
    }
    const { result, error } = yield call(makeFetchCall, 'signIn', null, authParams)

    if (result) {
      yield call(onAuthSuccess, { ...payload, ...result })
      return
    }

    yield put(actions.updateAuthStatus())

    if (error) {
      if (error.code === 401) {
        yield put(updateErrorStatus({
          id: 'status.signInFail',
        }))
        return
      }

      yield put(updateErrorStatus({
        id: 'status.fail',
        topic: 'auth.auth',
        detail: JSON.stringify(error),
      }))
    }
  } catch (fail) {
    yield put(updateAuthErrorStatus(fail))
  }
}

function* fetchUsers() {
  try {
    const { result: users } = yield call(postJsonFetch,
      `${config.API_URL}/json-rpc`, { method: 'getUsers' })

    if (users) {
      yield put(actions.setUsers(users))
      if (!users.length) {
        yield put(actions.clearAuth())
      }
    }
  } catch (fail) {
    yield put(updateAuthErrorStatus(fail))
  }
}

function* removeUser() {
  try {
    const { result, error } = yield call(makeFetchCall, 'removeUser')

    if (result) {
      yield put(actions.showAuth())
      yield put(actions.clearAuth())
      yield put(actions.fetchUsers())
      yield put(togglePreferencesDialog())
    }
    if (error) {
      yield put(updateErrorStatus({
        id: 'status.fail',
        topic: 'auth.auth',
        detail: JSON.stringify(error),
      }))
    }
  } catch (fail) {
    yield put(updateAuthErrorStatus(fail))
  }
}

function* checkAuth() {
  try {
    if (config.showFrameworkMode) {
      yield put(actions.fetchUsers())
    }

    const auth = yield select(selectAuth)
    if (_isEmpty(auth)) {
      return
    }

    if (config.showFrameworkMode) {
      yield put(actions.signIn(auth))
      return
    }

    yield put(actions.signUp(auth))
  } catch (fail) {
    yield put(updateAuthErrorStatus(fail))
  }
}

function* recoverPassword({ payload }) {
  try {
    const {
      apiKey,
      apiSecret,
      password,
      isNotProtected,
    } = payload
    const newPassword = isNotProtected ? undefined : password
    const { result, error } = yield call(makeFetchCall, 'recoverPassword', null, {
      apiKey,
      apiSecret,
      newPassword,
      isSubAccount: false,
      isNotProtected,
    })

    if (result) {
      yield call(onAuthSuccess, { ...payload, ...result })
      return
    }

    yield put(actions.updateAuthStatus())

    if (error) {
      yield put(updateErrorStatus({
        id: 'status.fail',
        topic: 'auth.auth',
        detail: JSON.stringify(error),
      }))
    }
  } catch (fail) {
    yield put(updateAuthErrorStatus(fail))
  }
}

function* logout() {
  yield put(tokenRefreshStop())
}

export default function* authSaga() {
  yield takeLatest(types.CHECK_AUTH, checkAuth)
  yield takeLatest(types.FETCH_USERS, fetchUsers)
  yield takeLatest(types.RECOVER_PASSWORD, recoverPassword)
  yield takeLatest(types.SIGN_UP, signUp)
  yield takeLatest(types.SIGN_UP_OTP, signUpOTP)
  yield takeLatest(types.SIGN_UP_EMAIL, signUpEmail)
  yield takeLatest(types.SIGN_IN, signIn)
  yield takeLatest(types.LOGOUT, logout)
  yield takeLatest(types.REMOVE_USER, removeUser)
  yield fork(tokenRefreshSaga)
}
