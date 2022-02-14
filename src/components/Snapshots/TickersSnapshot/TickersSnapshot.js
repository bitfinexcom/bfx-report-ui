import React, { memo } from 'react'
import PropTypes from 'prop-types'
import compose from 'lodash/fp/compose'
import { withTranslation } from 'react-i18next'

import DataTable from 'ui/DataTable'
import {
  getPositionsTickersColumns,
  getWalletsTickersColumns,
} from 'utils/columns'

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

TickersSnapshot.propTypes = {
  positionsTickersEntries: PropTypes.arrayOf(
    PropTypes.shape({
      pair: PropTypes.string,
      amount: PropTypes.number,
    }),
  ),
  walletsTickersEntries: PropTypes.arrayOf(
    PropTypes.shape({
      walletType: PropTypes.string,
      pair: PropTypes.string,
      amount: PropTypes.number,
    }),
  ),
  t: PropTypes.func.isRequired,
}
TickersSnapshot.defaultProps = {
  positionsTickersEntries: [],
  walletsTickersEntries: [],
}

export default compose(
  withTranslation('translations'),
  memo,
)(TickersSnapshot)
