import React, { memo } from 'react'
import PropTypes from 'prop-types'
import _map from 'lodash/map'

import Select from 'ui/Select'

import TIMEFRAMES from './var'

const items = _map(TIMEFRAMES, timeframe => timeframe)

const CandlesTimeframe = ({ value, onChange }) => (
  <Select
    value={value}
    items={items}
    onChange={onChange}
    className='bitfinex-select--timeframe'
    popoverClassName='bitfinex-select-menu--timeframe'
  />
)

CandlesTimeframe.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default memo(CandlesTimeframe)
