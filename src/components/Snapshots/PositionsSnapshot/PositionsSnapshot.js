import React, { memo } from 'react'
import compose from 'lodash/fp/compose'
import { withTranslation } from 'react-i18next'
import _isNumber from 'lodash/isNumber'

import DataTable from 'ui/DataTable'
import { fixedFloat } from 'ui/utils'
import { getFrameworkPositionsColumns } from 'utils/columns'

import { propTypes, defaultProps } from './PositionsSnapshot.props'

const PositionsSnapshot = ({
  t,
  entries,
  timeOffset,
  totalPlUsd,
  getFullTime,
}) => {
  const positionsColumns = getFrameworkPositionsColumns({
    t,
    timeOffset,
    getFullTime,
    filteredData: entries,
  })

  return (
    <>
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
    </>
  )
}


PositionsSnapshot.propTypes = propTypes
PositionsSnapshot.defaultProps = defaultProps

export default compose(
  withTranslation('translations'),
  memo,
)(PositionsSnapshot)
