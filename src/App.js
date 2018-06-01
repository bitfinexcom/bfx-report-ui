import React, { PureComponent } from 'react'
import './App.css'

import Auth from 'components/Auth'

class App extends PureComponent {
  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <h1 className='App-title'>Bfx Report</h1>
        </header>
        <Auth />
      </div>
    )
  }
}

export default App
