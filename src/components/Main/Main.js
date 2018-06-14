import React from 'react'
import PropTypes from 'prop-types'
import Ledgers from 'components/Ledgers'
import Movements from 'components/Movements'
import Orders from 'components/Orders'
import Timeframe from 'components/Timeframe'
import Trades from 'components/Trades'

function Main(props) {
  return props.isValid && !props.authIsShown ? (
    <div className='row'>
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
  isValid: PropTypes.bool,
}

export default Main
