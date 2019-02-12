import React from 'react'
import { Router } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import { createBrowserHistory } from 'history'

import Auth from 'components/Auth'
import Header from 'components/Header'
import Main from 'components/Main'
import i18n from 'locales/i18n'

const history = createBrowserHistory()

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <Router history={history}>
        <div className='container-fluid'>
          <Header />
          <Auth />
          <Main />
        </div>
      </Router>
    </I18nextProvider>
  )
}

export default App
