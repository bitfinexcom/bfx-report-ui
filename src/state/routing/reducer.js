import authTypes from 'state/auth/constants'
import { ROUTE_WHITELIST } from 'state/query/utils'

import types from './constants'

const getInitialRoutes = () => ROUTE_WHITELIST.reduce((acc, route) => {
  acc[route] = {}
  return acc
}, {})

const initialState = {
  ...getInitialRoutes(),
  lastRoute: undefined,
}

function routingReducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case types.SET_ROUTE_PARAMS: {
      const { route, params } = payload
      return {
        ...state,
        [route]: params,
      }
    }
    case types.SET_LAST_ROUTE: {
      return {
        ...state,
        lastRoute: payload,
      }
    }
    case authTypes.LOGOUT:
      return initialState
    default: {
      return state
    }
  }
}

export default routingReducer
