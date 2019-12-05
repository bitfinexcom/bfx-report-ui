import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { FocusStyleManager } from '@blueprintjs/core'
import { PersistGate } from 'redux-persist/integration/react'
import _debounce from 'lodash/debounce'

import 'normalize.css/normalize.css'
import 'flexboxgrid2/flexboxgrid2.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'
import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/table/lib/css/table.css'
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css'
import '@blueprintjs/select/lib/css/blueprint-select.css'
import '@blueprintjs/timezone/lib/css/blueprint-timezone.css'

import { persistor, store } from 'state/store'
import { platform } from 'var/config'
import { uiLoaded, uiResized } from 'state/ui/actions'
import 'styles/index.scss'

import App from './App'
import { version } from '../package.json'

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
)

window.addEventListener('load', () => {
  store.dispatch(uiLoaded())

  // eslint-disable-next-line no-console
  console.log(`platform: ${platform.name}`)
  // eslint-disable-next-line no-console
  console.log(`UI v.${version}`)
})

window.addEventListener('resize', _debounce(() => {
  store.dispatch(uiResized())
}, 100))

FocusStyleManager.onlyShowFocusOnTabs()
