import React, { Fragment, PureComponent } from 'react'
import { withTranslation } from 'react-i18next'

import DataTable from 'ui/DataTable'
import {
  getPositionsTickersColumns,
  getWalletsTickersColumns,
} from 'utils/columns'

import { propTypes, defaultProps } from './TickersSnapshot.props'

class TickersSnapshot extends PureComponent {
  render() {
    const {
      positionsTickersEntries,
      walletsTickersEntries,
      t,
    } = this.props

    const positionsTickersColumns = getPositionsTickersColumns({ filteredData: positionsTickersEntries })
    const walletsTickersColumns = getWalletsTickersColumns({ filteredData: walletsTickersEntries, t })

    return (
      <Fragment>
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
      </Fragment>
    )
  }
}

TickersSnapshot.propTypes = propTypes
TickersSnapshot.defaultProps = defaultProps

export default withTranslation('translations')(TickersSnapshot)
