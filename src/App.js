import React, { PureComponent } from 'react'
import './App.css'

import Auth from 'components/Auth'
import Ledgers from 'components/Ledgers'
import Movements from 'components/Movements'
import Orders from 'components/Orders'
import Trades from 'components/Trades'

class App extends PureComponent {
  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <h1 className='App-title'>Bfx Report</h1>
        </header>
        <Auth />
        <Ledgers />
        <Trades />
        <Orders />
        <Movements />
      </div>
    )
  }
}

export default App
