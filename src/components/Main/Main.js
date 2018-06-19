import React from 'react'
import PropTypes from 'prop-types'
import Ledgers from 'components/Ledgers'
import Movements from 'components/Movements'
import Orders from 'components/Orders'
import Timeframe from 'components/Timeframe'
import Trades from 'components/Trades'
import Status from 'components/Status'

function Main(props) {
  return props.authStatus && !props.authIsShown ? (
    <div className='row'>
      <Status />
      <Timeframe />
      <Ledgers />
      <Trades />
      <Orders />
      <Movements />
    </div>
  ) : ''
}

Main.propTypes = {
  authIsShown: PropTypes.bool.isRequired,
  authStatus: PropTypes.bool,
}

export default Main
