import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { isEmpty } from '@bitfinex/lib-js-util-base'

import DataTable from 'ui/DataTable'
import {
  getWalletsTickersColumns,
  getPositionsTickersColumns,
} from 'utils/columns'

import { propTypes, defaultProps } from './TickersSnapshot.props'

const TickersSnapshot = ({
  isLoading,
  walletsTickersEntries,
  positionsTickersEntries,
}) => {
  const { t } = useTranslation()
  const positionsTickersColumns = getPositionsTickersColumns({
    t,
    isLoading,
    filteredData: positionsTickersEntries,
    isNoData: isEmpty(positionsTickersEntries),
  })
  const walletsTickersColumns = getWalletsTickersColumns({
    t,
    isLoading,
    filteredData: walletsTickersEntries,
    isNoData: isEmpty(walletsTickersEntries),
  })

  return (
    <div className='tickers'>
      <div className='tables-row no-table-scroll'>
        <div className='tables-row-item'>
          <div>{t('positions.title')}</div>
          <DataTable
            tableColumns={positionsTickersColumns}
            numRows={positionsTickersEntries.length || 1}
          />
        </div>
        <div className='tables-row-item'>
          <div>{t('wallets.title')}</div>
          <DataTable
            tableColumns={walletsTickersColumns}
            numRows={walletsTickersEntries.length || 1}
          />
        </div>
      </div>
    </div>
  )
}

TickersSnapshot.propTypes = propTypes
TickersSnapshot.defaultProps = defaultProps

export default memo(TickersSnapshot)
