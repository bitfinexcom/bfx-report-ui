import React, { memo, useMemo } from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from '@bitfinex/lib-js-util-base'

import NoData from 'ui/NoData'
import Loading from 'ui/Loading'
import CollapsedTable from 'ui/CollapsedTable'

import { getFeesColumns } from './AppSummary.columns'
import { getFeeTierVolume } from './AppSummary.helpers'

const AppSummaryFees = ({
  t,
  data,
  pageLoading,
  dataReceived,
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

  const feeTierVolume = useMemo(
    () => getFeeTierVolume(data),
    [data],
  )

  const columns = getFeesColumns({
    makerFee,
    feeTierVolume,
    isTurkishSite,
    derivTakerFee,
    takerFeeToFiat,
    takerFeeToStable,
    takerFeeToCrypto,
    derivMakerRebate,
  })

  let showContent
  if (!dataReceived && pageLoading) {
    showContent = <Loading />
  } else if (isEmpty(data)) {
    showContent = <NoData title='summary.no_data' />
  } else {
    showContent = (
      <CollapsedTable
        numRows={1}
        tableColumns={columns}
      />
    )
  }

  return (
    <div className='app-summary-item account-fees'>
      <div className='app-summary-item-title'>
        {t('summary.fees.title')}
      </div>
      <div className='app-summary-item-sub-title'>
        {t('summary.fees.sub_title')}
      </div>
      {showContent}
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
  pageLoading: PropTypes.bool.isRequired,
  dataReceived: PropTypes.bool.isRequired,
}

export default memo(AppSummaryFees)
