import React, { Fragment, PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import _isNumber from 'lodash/isNumber'

import DataTable from 'ui/DataTable'
import { fixedFloat } from 'ui/utils'
import { getFrameworkPositionsColumns } from 'utils/columns'

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

    const positionsColumns = getFrameworkPositionsColumns({
      filteredData: entries,
      getFullTime,
      t,
      timeOffset,
    })

    return (
      <Fragment>
        {_isNumber(totalPlUsd) && (
          <div className='total-stats'>
            <div className='total-stats-item'>
              <div className='color--active'>
                {t('column.positionsTotal')}
              </div>
              <span>{fixedFloat(totalPlUsd)}</span>
            </div>
          </div>
        ) }

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
