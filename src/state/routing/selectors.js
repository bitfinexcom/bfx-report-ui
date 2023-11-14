import { get } from '@bitfinex/lib-js-util-base'

export const getRouting = state => state.routing
export const getLastRoute = state => getRouting(state).lastRoute
export const getRouteParams = (state, route) => get(getRouting(state), route, {})

export default {
  getRouting,
  getLastRoute,
}
