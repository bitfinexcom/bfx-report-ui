import React from 'react'

import Auth from './components/Auth'
import Header from './components/Header'
import Main from './components/Main'

// refer to https://github.com/bitfinexcom/webapp/tree/staging/app/views/reports/_index_content.html.erb

function App() {
  return (
    <div className='container-fluid'>
      <Header />
      <Auth />
      <Main />
    </div>
  )
}

export default App
