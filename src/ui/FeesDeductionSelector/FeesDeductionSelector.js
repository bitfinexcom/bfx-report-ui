import React, { memo, useMemo } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

import Select from 'ui/Select'

import constants from './constants'

const { TRUE, FALSE } = constants

const FeesDeductionSelector = ({ onChange, value }) => {
  const { t } = useTranslation()

  const items = useMemo(() => [
    { value: TRUE, label: t('selector.fees-deduction.yes') },
    { value: FALSE, label: t('selector.fees-deduction.no') },
  ], [t])

  return (
    <Select
      value={value}
      items={items}
      onChange={onChange}
    />
  )
}

FeesDeductionSelector.propTypes = {
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default memo(FeesDeductionSelector)
