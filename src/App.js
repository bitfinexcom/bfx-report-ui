import React from 'react'
import { Router } from 'react-router-dom'
import { IntlProvider } from 'react-intl'
import { createBrowserHistory } from 'history'

import { getLocale } from 'locales'
import Auth from 'components/Auth'
import Header from 'components/Header'
import Main from 'components/Main'

const history = createBrowserHistory()

function App() {
  const locale = getLocale()

  return (
    <IntlProvider locale={locale.locale} messages={locale.messages}>
      <Router history={history}>
        <div className='container-fluid'>
          <Header />
          <Auth />
          <Main />
        </div>
      </Router>
    </IntlProvider>
  )
}

export default App
