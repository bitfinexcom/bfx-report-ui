import React, { memo } from 'react'
import compose from 'lodash/fp/compose'
import { withTranslation } from 'react-i18next'

import DataTable from 'ui/DataTable'
import {
  getPositionsTickersColumns,
  getWalletsTickersColumns,
} from 'utils/columns'

import { propTypes, defaultProps } from './TickersSnapshot.props'

const TickersSnapshot = ({
  t,
  walletsTickersEntries,
  positionsTickersEntries,
}) => {
  const positionsTickersColumns = getPositionsTickersColumns({ filteredData: positionsTickersEntries })
  const walletsTickersColumns = getWalletsTickersColumns({ filteredData: walletsTickersEntries, t })

  return (
    <>
      <div className='tables-row no-table-scroll'>
        {positionsTickersEntries.length > 0 && (
        <div className='tables-row-item'>
          <div>{t('positions.title')}</div>
          <DataTable
            numRows={positionsTickersEntries.length}
            tableColumns={positionsTickersColumns}
          />
        </div>
        )}
        {walletsTickersEntries.length > 0 && (
        <div className='tables-row-item'>
          <div>{t('wallets.title')}</div>
          <DataTable
            numRows={walletsTickersEntries.length}
            tableColumns={walletsTickersColumns}
          />
        </div>
        )}
      </div>
    </>
  )
}

TickersSnapshot.propTypes = propTypes
TickersSnapshot.defaultProps = defaultProps

export default compose(
  withTranslation('translations'),
  memo,
)(TickersSnapshot)
