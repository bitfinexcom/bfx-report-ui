import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

import Select from 'ui/Select'

import constants from './constants'

const { TRUE, FALSE } = constants

const FeesDeductionSelector = ({ onChange, value }) => {
  const { t } = useTranslation()
  const items = [
    { value: TRUE, label: t('selector.fees-deduction.yes') },
    { value: FALSE, label: t('selector.fees-deduction.no') },
  ]

  return (
    <Select
      value={value}
      items={items}
      onChange={onChange}
      className='bitfinex-select--deduct-fees'
      popoverClassName='bitfinex-select-menu--deduct-fees'
    />
  )
}

FeesDeductionSelector.propTypes = {
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default memo(FeesDeductionSelector)
