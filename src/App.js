import React from 'react'
import { IntlProvider } from 'react-intl'
import { getLocale } from 'locales'
import Auth from 'components/Auth'
import Header from 'components/Header'
import Main from 'components/Main'

// refer to https://github.com/bitfinexcom/webapp/tree/staging/app/views/reports/_index_content.html.erb

function App() {
  const locale = getLocale()

  return (
    <IntlProvider locale={locale.locale} messages={locale.messages}>
      <div className='container-fluid'>
        <Header />
        <Auth />
        <Main />
      </div>
    </IntlProvider>
  )
}

export default App
