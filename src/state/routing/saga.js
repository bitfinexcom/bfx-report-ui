import { put, select, takeLatest } from 'redux-saga/effects'
import { LOCATION_CHANGE, replace } from 'connected-react-router'
import _isEmpty from 'lodash/isEmpty'

import { getTarget } from 'state/query/utils'
import { encodeFilters } from 'state/filters/utils'
import filterTypes from 'state/filters/constants'
import queryConstants from 'state/query/constants'
import { concatQueryStrings, getQueryWithoutParams, removeUrlParams } from 'state/utils'
import { FILTER_KEYS } from 'var/filterTypes'

import { setLastRoute, setRouteParams } from './actions'
import { getLastRoute, getRouteParams } from './selectors'

const { MENU_ORDER_TRADES } = queryConstants

function* locationChange({ payload }) {
  const { isFirstRendering, location } = payload
  const { pathname, search, state } = location

  if (isFirstRendering) {
    // redirects from legacy sections `deposits' and 'withdrawals' to 'movements' on first render
    if (pathname.includes('/deposits') || pathname.includes('/withdrawals')) {
      const [, , symbols] = pathname.split('/')
      yield put(replace(`/movements${symbols ? `/${symbols}` : ''}${search || ''}`, { isSkipped: true }))
      return
    }
  }

  if (!_isEmpty(state) && state.isSkipped) {
    return
  }

  const route = getTarget(pathname, false)
  if (!route) {
    return
  }

  const lastRoute = yield select(getLastRoute)
  if (lastRoute === MENU_ORDER_TRADES) {
    removeUrlParams(['orderId'])
    return
  }

  // return previously saved params on route change
  if (route !== lastRoute && !isFirstRendering) {
    const routeParams = yield select(getRouteParams, route)
    if (_isEmpty(routeParams)) {
      const query = getQueryWithoutParams(Object.keys(FILTER_KEYS)) // remove filters of current section
      yield put(replace(`${pathname}${query}`, { isSkipped: true }))
      return
    }

    /* eslint-disable-next-line no-shadow */
    const { pathname: routePathname, search } = routeParams
    yield put(replace(`${routePathname}${search}`, { isSkipped: true }))
    return
  }

  const options = {
    route,
    params: {
      pathname,
      search: getQueryWithoutParams(['timezone', 'theme', 'locale', 'authToken', 'apiKey', 'apiSecret']),
    },
  }

  yield put(setRouteParams(options))
}

function* lastRouteSet({ payload }) {
  const { location: { pathname } } = payload
  const route = getTarget(pathname, false)

  const lastRoute = yield select(getLastRoute)
  if (lastRoute !== route) {
    yield put(setLastRoute(route))
  }
}

function* filtersSet({ payload }) {
  const { section, filters } = payload

  const { pathname } = window.location
  const filtersQuery = encodeFilters(filters)

  const query = concatQueryStrings(getQueryWithoutParams(Object.keys(FILTER_KEYS)), filtersQuery)

  yield put(replace(`${pathname}${query}`, { isSkipped: true }))

  const options = {
    route: section,
    params: {
      pathname,
      search: query,
    },
  }

  yield put(setRouteParams(options))
}

export default function* routingSaga() {
  yield takeLatest(LOCATION_CHANGE, locationChange)
  yield takeLatest(LOCATION_CHANGE, lastRouteSet)
  yield takeLatest(filterTypes.SET_FILTERS, filtersSet)
}
