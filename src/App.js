import React from 'react'
import './App.css'

import Auth from './components/Auth'
import Ledgers from './components/Ledgers'
import Movements from './components/Movements'
import Orders from './components/Orders'
import Timeframe from './components/Timeframe'
import Trades from './components/Trades'

// refer to /home/gasolin/Documents/bitfinex/webapp/app/views/reports/_index_content.html.erb

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <h1 className='App-title'>Bfx Report</h1>
      </header>
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
