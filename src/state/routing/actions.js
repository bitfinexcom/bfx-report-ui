import types from './constants'

/**
 * Create an action to set route query params.
 * @param {Object} options: route and params to set
 */
export function setRouteParams({ route, params }) {
  return {
    type: types.SET_ROUTE_PARAMS,
    payload: { route, params },
  }
}

/**
 * Create an action to set last visited route.
 */
export function setLastRoute(route) {
  return {
    type: types.SET_LAST_ROUTE,
    payload: route,
  }
}

export default {
  setRouteParams,
  setLastRoute,
}
