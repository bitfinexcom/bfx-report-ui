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
        <h4>{t('positions.title')}</h4>
        <DataTable
          numRows={positionsTickersEntries.length}
          tableColumns={positionsTickersColumns}
        />
        <h4>{t('wallets.title')}</h4>
        <DataTable
          numRows={walletsTickersEntries.length}
          tableColumns={walletsTickersColumns}
        />
      </Fragment>
    )
  }
}

TickersSnapshot.propTypes = propTypes
TickersSnapshot.defaultProps = defaultProps

export default withTranslation('translations')(TickersSnapshot)
