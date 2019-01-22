import React from 'react'
import { Router } from 'react-router-dom'
import { IntlProvider } from 'react-intl'
import { I18nextProvider } from 'react-i18next'
import { createBrowserHistory } from 'history'

import { getLocale } from 'locales'
import Auth from 'components/Auth'
import Header from 'components/Header'
import Main from 'components/Main'
import i18n from 'locales/i18n'

const history = createBrowserHistory()

function App() {
  const locale = getLocale()

  return (
    <IntlProvider locale={locale.locale} messages={locale.messages}>
      <I18nextProvider i18n={i18n}>
        <Router history={history}>
          <div className='container-fluid'>
            <Header />
            <Auth />
            <Main />
          </div>
        </Router>
      </I18nextProvider>
    </IntlProvider>
  )
}

export default App
