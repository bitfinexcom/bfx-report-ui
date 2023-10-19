import React, { memo } from 'react'
import PropTypes from 'prop-types'

import CollapsedTable from 'ui/CollapsedTable'

import { getFeesColumns } from './AppSummary.columns'

const AppSummaryFees = ({
  t,
  data,
  isTurkishSite,
}) => {
  const {
    makerFee = 0,
    derivTakerFee = 0,
    takerFeeToFiat = 0,
    takerFeeToStable = 0,
    takerFeeToCrypto = 0,
    derivMakerRebate = 0,
  } = data

  const columns = getFeesColumns({
    makerFee,
    isTurkishSite,
    derivTakerFee,
    takerFeeToFiat,
    takerFeeToStable,
    takerFeeToCrypto,
    derivMakerRebate,
  })

  return (
    <div className='app-summary-item account-fees'>
      <div className='app-summary-item-title'>
        {t('summary.fees.title')}
      </div>
      <div className='app-summary-item-sub-title'>
        {t('summary.fees.sub_title')}
      </div>
      <CollapsedTable
        numRows={1}
        tableColumns={columns}
      />
    </div>
  )
}

AppSummaryFees.propTypes = {
  data: PropTypes.shape({
    derivMakerRebate: PropTypes.number,
    derivTakerFee: PropTypes.number,
    makerFee: PropTypes.number,
    takerFeeToCrypto: PropTypes.number,
    takerFeeToFiat: PropTypes.number,
    takerFeeToStable: PropTypes.number,
  }).isRequired,
  t: PropTypes.func.isRequired,
  isTurkishSite: PropTypes.bool.isRequired,
}

export default memo(AppSummaryFees)
