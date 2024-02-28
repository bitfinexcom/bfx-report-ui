import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'
import _isNumber from 'lodash/isNumber'

import DataTable from 'ui/DataTable'
import { fixedFloat } from 'ui/utils'
import { getFrameworkPositionsColumns } from 'utils/columns'

import { propTypes, defaultProps } from './PositionsSnapshot.props'

const PositionsSnapshot = ({
  entries,
  isNoData,
  isLoading,
  timeOffset,
  totalPlUsd,
  getFullTime,
}) => {
  const { t } = useTranslation()
  const positionsColumns = getFrameworkPositionsColumns({
    t,
    isNoData,
    isLoading,
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
        isNoData={isNoData}
        isLoading={isLoading}
        numRows={entries.length}
        tableColumns={positionsColumns}
      />
    </>
  )
}

PositionsSnapshot.propTypes = propTypes
PositionsSnapshot.defaultProps = defaultProps

export default memo(PositionsSnapshot)
