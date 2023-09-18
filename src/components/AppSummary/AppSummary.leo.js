import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

import { fixedFloat } from 'ui/utils'

const AccountSummaryLeo = ({ data }) => {
  const { t } = useTranslation()
  const { leoLev, leoAmountAvg } = data
  const formattedLeoAmountAvg = fixedFloat(leoAmountAvg)

  return (
    <div className='section-account-summary-data-item'>
      <div className='data-item--divider' />
      <p>{leoLev}</p>
      <p>{formattedLeoAmountAvg}</p>
    </div>
  )
}

AccountSummaryLeo.propTypes = {
  data: PropTypes.shape({
    leoLev: PropTypes.number.isRequired,
    leoAmountAvg: PropTypes.number.isRequired,
  }).isRequired,
}

export default memo(AccountSummaryLeo)
