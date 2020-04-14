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
} = constants

const WalletsData = (props) => {
  const { entries, t } = props

  const exchangeData = entries.filter(entry => entry.type === WALLET_EXCHANGE)
  const marginData = entries.filter(entry => entry.type === WALLET_MARGIN)
  const fundingData = entries.filter(entry => entry.type === WALLET_FUNDING)
  const exchangeColumns = getColumns({ filteredData: exchangeData, t })
  const marginColumns = getColumns({ filteredData: marginData, t })
  const fundingColumns = getColumns({ filteredData: fundingData, t })

  return (
    <div className='tables-row'>
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
    </div>
  )
}

WalletsData.propTypes = {
  entries: PropTypes.arrayOf(WALLETS_ENTRIES_PROPS).isRequired,
  t: PropTypes.func.isRequired,
}

export default withTranslation('translations')(WalletsData)
