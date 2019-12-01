import React, { Fragment, PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import _isNumber from 'lodash/isNumber'

import DataTable from 'ui/DataTable'
import { getFrameworkPositionsColumns } from 'utils/columns'

import getTotalPositionsColumns from './TotalPositions.columns'
import { propTypes, defaultProps } from './PositionsSnapshot.props'

class PositionsSnapshot extends PureComponent {
  render() {
    const {
      totalPlUsd,
      entries,
      getFullTime,
      timeOffset,
      t,
    } = this.props

    const totalPositionsColumns = getTotalPositionsColumns({ totalPlUsd })
    const positionsColumns = getFrameworkPositionsColumns({
      filteredData: entries,
      getFullTime,
      t,
      timeOffset,
    })

    return (
      <Fragment>
        <br />
        {_isNumber(totalPlUsd) && (
          <DataTable
            numRows={1}
            tableColumns={totalPositionsColumns}
          />
        ) }
        <br />
        <DataTable
          numRows={entries.length}
          tableColumns={positionsColumns}
        />
      </Fragment>
    )
  }
}

PositionsSnapshot.propTypes = propTypes
PositionsSnapshot.defaultProps = defaultProps

export default withTranslation('translations')(PositionsSnapshot)
