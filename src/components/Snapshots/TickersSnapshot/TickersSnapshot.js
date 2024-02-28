import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'

import DataTable from 'ui/DataTable'
import {
  getWalletsTickersColumns,
  getPositionsTickersColumns,
} from 'utils/columns'

import { propTypes, defaultProps } from './TickersSnapshot.props'

const TickersSnapshot = ({
  isNoData,
  isLoading,
  walletsTickersEntries,
  positionsTickersEntries,
}) => {
  const { t } = useTranslation()
  const positionsTickersColumns = getPositionsTickersColumns({
    filteredData: positionsTickersEntries, t, isNoData, isLoading,
  })
  const walletsTickersColumns = getWalletsTickersColumns({
    filteredData: walletsTickersEntries, t, isNoData, isLoading,
  })

  return (
    <>
      <div className='tables-row no-table-scroll'>
        {positionsTickersEntries.length > 0 && (
        <div className='tables-row-item'>
          <div>{t('positions.title')}</div>
          <DataTable
            tableColumns={positionsTickersColumns}
            numRows={positionsTickersEntries.length || 1}
          />
        </div>
        )}
        {walletsTickersEntries.length > 0 && (
        <div className='tables-row-item'>
          <div>{t('wallets.title')}</div>
          <DataTable
            tableColumns={walletsTickersColumns}
            numRows={walletsTickersEntries.length || 1}
          />
        </div>
        )}
      </div>
    </>
  )
}

TickersSnapshot.propTypes = propTypes
TickersSnapshot.defaultProps = defaultProps

export default memo(TickersSnapshot)
