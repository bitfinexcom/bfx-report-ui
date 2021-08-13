import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'

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

const WalletsData = (props) => {
  const { entries, t } = props

  const exchangeData = entries.filter(entry => entry.type === WALLET_EXCHANGE)
  const marginData = entries.filter(entry => entry.type === WALLET_MARGIN)
  const fundingData = entries.filter(entry => entry.type === WALLET_FUNDING)
  const contributionData = entries.filter(entry => entry.type === WALLET_CONTRIBUTION)
  const exchangeColumns = getColumns({ filteredData: exchangeData })
  const marginColumns = getColumns({ filteredData: marginData })
  const fundingColumns = getColumns({ filteredData: fundingData })
  const contributionColumns = getColumns({ filteredData: contributionData })

  return (
    <div className='tables-row no-table-scroll'>
      <div className='tables-row-item'>
        <div>{t('wallets.header.exchange')}</div>
        <DataTable
          numRows={exchangeData.length}
          tableColumns={exchangeColumns}
        />
      </div>
      <div className='tables-row-item'>
        <div>{t('wallets.header.margin')}</div>
        <DataTable
          numRows={marginData.length}
          tableColumns={marginColumns}
        />
      </div>
      <div className='tables-row-item'>
        <div>{t('wallets.header.funding')}</div>
        <DataTable
          numRows={fundingData.length}
          tableColumns={fundingColumns}
        />
      </div>
      <div className='tables-row-item'>
        <div>{t('wallets.header.capital-raise')}</div>
        <DataTable
          numRows={contributionData.length}
          tableColumns={contributionColumns}
        />
      </div>
    </div>
  )
}

WalletsData.propTypes = {
  entries: PropTypes.arrayOf(WALLETS_ENTRIES_PROPS).isRequired,
  t: PropTypes.func.isRequired,
}

export default withTranslation('translations')(WalletsData)
