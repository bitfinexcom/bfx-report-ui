import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'

import Select from 'ui/Select'

import constants from './constants'

const { TRUE, FALSE } = constants

const FeesDeductionSelector = ({ onChange, t, value }) => {
  const items = [
    { value: FALSE, label: t('selector.fees-deduction.yes') },
    { value: TRUE, label: t('selector.fees-deduction.no') },
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
  t: PropTypes.func.isRequired,
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default withTranslation('translations')(FeesDeductionSelector)
