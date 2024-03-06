import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'
import { isEmpty } from '@bitfinex/lib-js-util-base'

import DataTable from 'ui/DataTable'

import getColumns from './Wallets.columns'
import { WALLETS_ENTRIES_PROPS } from './Wallets.props'
import constants from './var'

const {
  WALLET_EXCHANGE,
  WALLET_MARGIN,
  WALLET_FUNDING,
  WALLET_CONTRIBUTION,
} = constants

const WalletsData = ({
  t,
  entries,
  isLoading,
}) => {
  const exchangeData = entries.filter(entry => entry.type === WALLET_EXCHANGE)
  const marginData = entries.filter(entry => entry.type === WALLET_MARGIN)
  const fundingData = entries.filter(entry => entry.type === WALLET_FUNDING)
  const contributionData = entries.filter(entry => entry.type === WALLET_CONTRIBUTION)

  const exchangeColumns = getColumns({
    filteredData: exchangeData, t, isNoData: isEmpty(exchangeData), isLoading,
  })
  const marginColumns = getColumns({
    filteredData: marginData, t, isNoData: isEmpty(marginData), isLoading,
  })
  const fundingColumns = getColumns({
    filteredData: fundingData, t, isNoData: isEmpty(fundingData), isLoading,
  })
  const contributionColumns = getColumns({
    filteredData: contributionData, t, isNoData: isEmpty(contributionData), isLoading,
  })

  return (
    <div className='tables-row no-table-scroll'>
      <div className='tables-row-item'>
        <div>{t('wallets.header.exchange')}</div>
        <DataTable
          tableColumns={exchangeColumns}
          numRows={exchangeData.length || 1}
        />
      </div>
      <div className='tables-row-item'>
        <div>{t('wallets.header.margin')}</div>
        <DataTable
          tableColumns={marginColumns}
          numRows={marginData.length || 1}
        />
      </div>
      <div className='tables-row-item'>
        <div>{t('wallets.header.funding')}</div>
        <DataTable
          tableColumns={fundingColumns}
          numRows={fundingData.length || 1}
        />
      </div>
      <div className='tables-row-item'>
        <div>{t('wallets.header.capital-raise')}</div>
        <DataTable
          tableColumns={contributionColumns}
          numRows={contributionData.length || 1}
        />
      </div>
    </div>
  )
}

WalletsData.propTypes = {
  t: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  entries: PropTypes.arrayOf(WALLETS_ENTRIES_PROPS).isRequired,
}

export default withTranslation('translations')(WalletsData)
