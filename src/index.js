import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { FocusStyleManager } from '@blueprintjs/core'
import { PersistGate } from 'redux-persist/integration/react'

import 'normalize.css/normalize.css'
import 'flexboxgrid2/flexboxgrid2.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'
import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/table/lib/css/table.css'
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css'
import { persistor, store } from 'state/store'
import { checkAuthWithToken } from 'state/auth/actions'
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

function getUrlParameter(name) {
  const regex = new RegExp(`[\\?&]${name}=([^&#]*)`)
  const results = regex.exec(window.location.search)
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '))
}

window.addEventListener('load', function handler() {
  const token = getUrlParameter('authToken')
  if (token) {
    window.removeEventListener('load', handler)
    // remove url params
    window.history.pushState(null, null, window.location.href.replace(window.location.search, ''))
    store.dispatch(checkAuthWithToken(token))
  }
})

FocusStyleManager.onlyShowFocusOnTabs()
