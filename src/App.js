import React from 'react'
import { ConnectedRouter } from 'connected-react-router'
import { I18nextProvider } from 'react-i18next'

import i18n from 'locales/i18n'
import history from 'state/createdHistory'
import Auth from 'components/Auth'
import Header from 'components/Header'
import Main from 'components/Main'

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <ConnectedRouter history={history}>
        <Header />
        <div className='container-fluid'>
          <Auth />
          <Main />
        </div>
      </ConnectedRouter>
    </I18nextProvider>
  )
}

export default App
