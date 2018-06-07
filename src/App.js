import React from 'react'
import './App.css'

import Auth from './components/Auth'
import Header from './components/Header'
import Ledgers from './components/Ledgers'
import Movements from './components/Movements'
import Orders from './components/Orders'
import Timeframe from './components/Timeframe'
import Trades from './components/Trades'

// refer to /home/gasolin/Documents/bitfinex/webapp/app/views/reports/_index_content.html.erb

function App() {
  return (
    <div className='App'>
      <Header />
      <Auth />
      <Timeframe />
      <Ledgers />
      <Trades />
      <Orders />
      <Movements />
    </div>
  )
}

export default App
