import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

import Select from 'ui/Select'

import constants from './constants'

const { APPROXIMATE, EXACT } = constants

const BalancePrecisionSelector = ({ onChange, value }) => {
  const { t } = useTranslation()

  const items = [
    { value: APPROXIMATE, label: t('selector.balance-precision.approximate') },
    { value: EXACT, label: t('selector.balance-precision.exact') },
  ]

  return (
    <Select
      value={value}
      items={items}
      onChange={onChange}
      type={'Balance(USD)'}
      className='bitfinex-select--balance-precision'
      popoverClassName='bitfinex-select-menu--balance-precision'
    />
  )
}

BalancePrecisionSelector.propTypes = {
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default BalancePrecisionSelector
