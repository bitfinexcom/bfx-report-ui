import React, { Suspense } from 'react'
import { useSelector } from 'react-redux'
import { Router } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'

import i18n from 'locales/i18n'
import { history } from 'state/store'
import Auth from 'components/Auth'
import ElectronMenu from 'components/ElectronMenu'
import Header from 'components/Header'
import Main from 'components/Main'
import { getIsElectronMenuHidden } from 'state/electronMenu/selectors'

function App() {
  const showElectronMenu = !useSelector(getIsElectronMenuHidden)

  return (
    <I18nextProvider i18n={i18n}>
      <Suspense fallback={<div className='app-loader' />}>
        <Router history={history}>
          {showElectronMenu && (<ElectronMenu />)}
          <Header />
          <div className='app'>
            <Auth />
            <Main />
          </div>
        </Router>
      </Suspense>
    </I18nextProvider>
  )
}

export default App
