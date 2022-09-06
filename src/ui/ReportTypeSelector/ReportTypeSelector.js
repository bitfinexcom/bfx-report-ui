import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'

import Select from 'ui/Select'

import constants from './constants'
import Item from './ReportTypeSelector.item'

const {
  TRUE,
  FALSE,
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
  t: PropTypes.func.isRequired,
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default withTranslation('translations')(ReportTypeSelector)
