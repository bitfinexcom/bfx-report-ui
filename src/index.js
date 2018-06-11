import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { FocusStyleManager } from '@blueprintjs/core'
import 'flexboxgrid/dist/flexboxgrid.css'
import '@blueprintjs/core/lib/css/blueprint.css'
import './index.css'
import App from './App'
import { store } from './state/store'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
)

FocusStyleManager.onlyShowFocusOnTabs()
