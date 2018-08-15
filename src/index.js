import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { FocusStyleManager } from '@blueprintjs/core'
import { PersistGate } from 'redux-persist/integration/react'
import queryString from 'query-string'
import _omit from 'lodash/omit'

import 'normalize.css/normalize.css'
import 'flexboxgrid2/flexboxgrid2.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'
import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/table/lib/css/table.css'
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css'
import '@blueprintjs/select/lib/css/blueprint-select.css'
import '@blueprintjs/timezone/lib/css/blueprint-timezone.css'

import { persistor, store } from 'state/store'
import { checkAuthWithToken } from 'state/auth/actions'
import { setCustomTimeRange } from 'state/query/actions'
import { platform } from 'var/config'
import 'styles/index.css'

import App from './App'

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
)

window.addEventListener('load', function handler() {
  const parsed = queryString.parse(window.location.search)
  const { authToken, range } = parsed
  if (range && range.indexOf('-') > -1) {
    const [startStr, endStr] = range.split('-')
    store.dispatch(setCustomTimeRange(parseInt(startStr, 10), parseInt(endStr, 10)))
  }
  if (authToken) {
    window.removeEventListener('load', handler)
    // remove authToken param from url but keep others
    const params = _omit(parsed, 'authToken')
    const queries = queryString.stringify(params, { encode: false })
    const queryParams = queries ? `?${queries}` : ''
    window.history.pushState(null, null,
      window.location.href.replace(
        window.location.search,
        queryParams,
      ))
    store.dispatch(checkAuthWithToken(authToken))
  }

  // eslint-disable-next-line no-console
  console.log(`platform: ${platform.name}`)
})

FocusStyleManager.onlyShowFocusOnTabs()
