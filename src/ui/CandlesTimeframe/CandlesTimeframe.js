import React from 'react'
import _map from 'lodash/map'

import Select from 'ui/Select'

import { propTypes, defaultProps } from './CandlesTimeframe.props'
import TIMEFRAMES from './var'

const CandlesTimeframe = (props) => {
  const { value, onChange } = props
  const items = _map(TIMEFRAMES, timeframe => timeframe)

  return (
    <Select
      className='bitfinex-select--timeframe'
      popoverClassName='bitfinex-select-menu--timeframe'
      value={value}
      items={items}
      onChange={onChange}
    />
  )
}

CandlesTimeframe.propTypes = propTypes
CandlesTimeframe.defaultProps = defaultProps

export default CandlesTimeframe
