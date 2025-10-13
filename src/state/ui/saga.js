import {
  call, take, put, select, takeLatest,
} from 'redux-saga/effects'
import { REHYDRATE } from 'redux-persist'

import config from 'config'
import { LANGUAGES } from 'locales/i18n'
import {
  setTimezone, setTheme, setLang, setSrc, setElectronTheme,
} from 'state/base/actions'
import baseTypes from 'state/base/constants'
import { getCookieValue } from 'utils/browser'
import { BFX_TOKEN_COOKIE } from 'var/platform'
import { getTheme } from 'state/base/selectors'
import { setTimeRange } from 'state/timeRange/actions'
import timeRangeTypes from 'state/timeRange/constants'
import handleElectronLoad from 'utils/handleElectronLoad'
import { checkAuth, updateAuth } from 'state/auth/actions'
import { getNewTheme, getThemeClass, verifyTheme } from 'utils/themes'
import { getParsedUrlParams, isValidTimezone, removeUrlParams } from 'state/utils'

import types from './constants'
import selectors from './selectors'
import { togglePaginationDialog } from './actions'

const { showFrameworkMode } = config

function* uiLoaded() {
  if (config.isElectronApp) {
    handleElectronLoad()
    const lang = yield call(window?.bfxReportElectronApi?.getLanguage) || LANGUAGES.en
    yield put(setLang(lang))
    const { isDarkTheme, isLightTheme, isSystemTheme } = yield call(window?.bfxReportElectronApi?.getTheme)
    if (isDarkTheme) yield put(setTheme(baseTypes.THEME_DARK))
    if (isSystemTheme) yield put(setElectronTheme(baseTypes.DEFAULT_THEME))
    if (isLightTheme && !isSystemTheme) yield put(setTheme(baseTypes.THEME_LIGHT))
  }

  const parsed = getParsedUrlParams(window.location.search)
  const {
    authToken, apiKey, apiSecret, timezone, theme, locale, range, src,
  } = parsed

  if (src) {
    yield put(setSrc(src))
  }

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
    const lang = LANGUAGES[parsedLocale]
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

  // handle auth from url params & cookie token
  const apiKeys = apiKey && apiSecret
  const cookieToken = getCookieValue(BFX_TOKEN_COOKIE)
  if (authToken || apiKeys) {
    yield put(updateAuth({
      apiKey,
      apiSecret,
      authToken,
    }))
  } else if (!authToken && !apiKeys && !showFrameworkMode && cookieToken) {
    yield put(updateAuth({
      authToken: cookieToken,
    }))
  }

  // skip auto auth for electron build because front is loading faster
  // also skip in case apiKey and apiSecret are set from url to give user a chance not to save them
  if (!config.isElectronApp && !(apiKey && apiSecret)) {
    yield put(checkAuth())
  }
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
