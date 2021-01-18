import {
  call, take, put, select, takeLatest,
} from 'redux-saga/effects'
import { REHYDRATE } from 'redux-persist'

import { setTimezone, setTheme, setLang } from 'state/base/actions'
import { checkAuth, updateAuth } from 'state/auth/actions'
import { setTimeRange } from 'state/timeRange/actions'
import { getParsedUrlParams, isValidTimezone, removeUrlParams } from 'state/utils'
import { isSynced } from 'state/sync/saga'
import { getNewTheme, getThemeClass, verifyTheme } from 'utils/themes'
import config, { platform } from 'var/config'
import timeRangeTypes from 'state/timeRange/constants'
import { getTheme } from 'state/base/selectors'
import { LANGUAGES } from 'locales/i18n'
import handleElectronLoad from 'utils/handleElectronLoad'

import types from './constants'
import { toggleFrameworkDialog, togglePaginationDialog } from './actions'
import selectors from './selectors'

function* uiLoaded() {
  if (config.isElectronApp) {
    handleElectronLoad()
  }

  const parsed = getParsedUrlParams(window.location.search)
  const {
    authToken, apiKey, apiSecret, timezone, theme, locale, range,
  } = parsed

  removeUrlParams(['timezone', 'theme', 'locale', 'authToken', 'apiKey', 'apiSecret'])

  // handle custom timezone
  if (timezone && isValidTimezone(timezone)) {
    yield put(setTimezone(timezone))
  }

  // handle custom theme
  if (theme) {
    const themeClass = getThemeClass(theme)
    yield put(setTheme(themeClass))
  } else {
    // check if current theme is valid, replace if not
    const currentTheme = yield select(getTheme)
    if (!verifyTheme(currentTheme)) {
      const newTheme = getNewTheme(currentTheme)
      yield put(setTheme(newTheme))
    }
  }

  // handle custom locale
  if (locale) {
    // replace handles underscored param on mobile
    const parsedLocale = locale.replace('_', '-')
    const lang = Object.keys(LANGUAGES).find(key => LANGUAGES[key] === parsedLocale)
    yield put(setLang(lang))
  }

  // handle custom time range
  if (range && range.indexOf('-') > -1) {
    const [startStr, endStr] = range.split('-')
    yield put(setTimeRange({
      range: timeRangeTypes.CUSTOM,
      start: parseInt(startStr, 10),
      end: parseInt(endStr, 10),
    }))
  }

  // handle auth from url params
  if (authToken || (apiKey && apiSecret)) {
    yield put(updateAuth({
      apiKey,
      apiSecret,
      authToken,
    }))
  }

  // skip auto auth for electron build because front is loading faster
  // also skip in case apiKey and apiSecret are set from url to give user a chance not to save them
  if (!config.isElectronApp && !(apiKey && apiSecret)) {
    yield put(checkAuth())
  }
}

// user confirmation for proceeding with framework request while not in sync
export function* frameworkCheck() {
  if (!platform.showFrameworkMode || localStorage.getItem('isFrameworkDialogDisabled')) {
    return true
  }
  if (yield call(isSynced)) {
    return true
  }
  yield put(toggleFrameworkDialog())

  const { payload: { shouldProceed, isFrameworkDialogDisabled } } = yield take(types.PROCEED_FRAMEWORK_REQUEST)
  if (isFrameworkDialogDisabled) {
    // save timestamp for future use
    const disablingTime = new Date().getTime()
    localStorage.setItem('isFrameworkDialogDisabled', disablingTime)
  }

  return shouldProceed
}

// user confirmation for proceeding with multiple consecutive empty search requests
export function* paginationCheck(latestPaginationTimestamp) {
  // handles pending late request from other section
  const isPaginationDialogOpen = yield select(selectors.getIsPaginationDialogOpen)
  if (isPaginationDialogOpen) {
    return true
  }

  yield put(togglePaginationDialog(true, latestPaginationTimestamp))

  const { payload: shouldProceed } = yield take(types.PROCEED_PAGINATION_REQUEST)

  return shouldProceed
}

export default function* uiSaga() {
  yield takeLatest(REHYDRATE, uiLoaded)
}
