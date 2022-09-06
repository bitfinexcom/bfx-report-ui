import React from 'react'
import PropTypes from 'prop-types'

import Select from 'ui/Select'

import constants from './constants'
import Item from './ReportTypeSelector.item'

const {
  WIN_LOSS,
  GAINS_DEPOSITS,
  GAINS_BALANCE,
} = constants

const ReportTypeSelector = ({ onChange, value }) => {
  const items = [
    { value: WIN_LOSS, label: <Item type={WIN_LOSS} /> },
    { value: GAINS_DEPOSITS, label: <Item type={GAINS_DEPOSITS} showIcon /> },
    { value: GAINS_BALANCE, label: <Item type={GAINS_BALANCE} showIcon /> },
  ]

  return (
    <Select
      value={value}
      items={items}
      onChange={onChange}
      className='bitfinex-select--report-type'
      popoverClassName='bitfinex-select-menu--report-type'
    />
  )
}

ReportTypeSelector.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
}

ReportTypeSelector.defaultProps = {
  value: WIN_LOSS,
}

export default ReportTypeSelector
