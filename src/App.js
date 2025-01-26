import React from 'react'
import { useSelector } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { I18nextProvider } from 'react-i18next'

import i18n from 'locales/i18n'
import history from 'state/createdHistory'
import Auth from 'components/Auth'
import ElectronMenu from 'components/ElectronMenu'
import Header from 'components/Header'
import Main from 'components/Main'
import { getIsElectronMenuHidden } from 'state/electronMenu/selectors'

function App() {
  const showElectronMenu = !useSelector(getIsElectronMenuHidden)
  console.log('+++showElectronMenu', showElectronMenu)

  return (
    <I18nextProvider i18n={i18n}>
      <ConnectedRouter history={history}>
        {showElectronMenu && (<ElectronMenu />)}
        <Header />
        <div className='app'>
          <Auth />
          <Main />
        </div>
      </ConnectedRouter>
    </I18nextProvider>
  )
}

export default App
