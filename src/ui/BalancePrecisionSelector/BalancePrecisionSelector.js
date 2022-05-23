import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'

import Select from 'ui/Select'

import constants from './constants'

const { APPROXIMATE, EXACT } = constants

const BalancePrecisionSelector = ({ onChange, t, value }) => {
  const items = [
    { value: APPROXIMATE, label: t('selector.balance-precision.approximate') },
    { value: EXACT, label: t('selector.balance-precision.exact') },
  ]

  return (
    <Select
      value={value}
      items={items}
      onChange={onChange}
      className='bitfinex-select--balance-precision'
      popoverClassName='bitfinex-select-menu--balance-precision'
    />
  )
}

BalancePrecisionSelector.propTypes = {
  t: PropTypes.func.isRequired,
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default withTranslation('translations')(BalancePrecisionSelector)
