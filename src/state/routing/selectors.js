import _get from 'lodash/get'

export const getRouting = state => state.routing
export const getLastRoute = state => getRouting(state).lastRoute
export const getRouteParams = (state, route) => _get(getRouting(state), route, {})

export default {
  getRouting,
  getLastRoute,
}
