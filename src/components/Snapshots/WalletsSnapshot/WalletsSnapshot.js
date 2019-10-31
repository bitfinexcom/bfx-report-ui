import React, { Fragment, PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import _isNumber from 'lodash/isNumber'

import DataTable from 'ui/DataTable'
import queryConstants from 'state/query/constants'

import getTotalWalletsColumns from './TotalWallets.columns'
import getWalletsColumns from './Wallets.columns'
import { propTypes, defaultProps } from './WalletsSnapshot.props'

const {
  WALLET_EXCHANGE,
  WALLET_MARGIN,
  WALLET_FUNDING,
} = queryConstants

class WalletsSnapshot extends PureComponent {
  render() {
    const {
      totalBalanceUsd,
      entries,
      t,
    } = this.props

    const totalWalletsColumns = getTotalWalletsColumns({ totalBalanceUsd })

    const exchangeData = entries.filter(entry => entry.type === WALLET_EXCHANGE)
    const marginData = entries.filter(entry => entry.type === WALLET_MARGIN)
    const fundingData = entries.filter(entry => entry.type === WALLET_FUNDING)
    const exchangeColumns = getWalletsColumns({ filteredData: exchangeData, t })
    const marginColumns = getWalletsColumns({ filteredData: marginData, t })
    const fundingColumns = getWalletsColumns({ filteredData: fundingData, t })
    const exchangeRows = exchangeData.length
    const marginRows = marginData.length
    const fundingRows = fundingData.length

    return (
      <Fragment>
        <br />
        {_isNumber(totalBalanceUsd) && (
          <DataTable
            numRows={1}
            tableColums={totalWalletsColumns}
          />
        ) }
        <h4>
          {t('wallets.header.exchange')}
        </h4>
        <DataTable
          numRows={exchangeRows}
          tableColums={exchangeColumns}
        />
        <h4>
          {t('wallets.header.margin')}
        </h4>
        <DataTable
          numRows={marginRows}
          tableColums={marginColumns}
        />
        <h4>
          {t('wallets.header.funding')}
        </h4>
        <DataTable
          numRows={fundingRows}
          tableColums={fundingColumns}
        />
      </Fragment>
    )
  }
}

WalletsSnapshot.propTypes = propTypes
WalletsSnapshot.defaultProps = defaultProps

export default withTranslation('translations')(WalletsSnapshot)
