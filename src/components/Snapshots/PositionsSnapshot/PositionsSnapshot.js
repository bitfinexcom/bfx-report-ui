import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import _isNumber from 'lodash/isNumber'

import DataTable from 'ui/DataTable'
import { fixedFloat } from 'ui/utils'
import { getFrameworkPositionsColumns } from 'utils/columns'
import { getFullTime, getTimeOffset } from 'state/base/selectors'

const POSITIONS_ENTRIES_PROPS = PropTypes.shape({
  id: PropTypes.number,
  pl: PropTypes.number,
  plUsd: PropTypes.number,
  plPerc: PropTypes.number,
  amount: PropTypes.number,
  status: PropTypes.string,
  leverage: PropTypes.number,
  basePrice: PropTypes.number,
  mtsCreate: PropTypes.number,
  mtsUpdate: PropTypes.number,
  actualPrice: PropTypes.number,
  marginFunding: PropTypes.number,
  pair: PropTypes.string.isRequired,
  liquidationPrice: PropTypes.number,
  marginFundingType: PropTypes.number,
})

const PositionsSnapshot = ({
  entries,
  isNoData,
  isLoading,
  totalPlUsd,
}) => {
  const { t } = useTranslation()
  const timeOffset = useSelector(getTimeOffset)
  const getFullTimeFn = useSelector(getFullTime)
  const positionsColumns = getFrameworkPositionsColumns({
    t,
    isNoData,
    isLoading,
    timeOffset,
    filteredData: entries,
    getFullTime: getFullTimeFn,
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
        numRows={entries.length || 1}
        tableColumns={positionsColumns}
      />
    </>
  )
}

PositionsSnapshot.propTypes = {
  totalPlUsd: PropTypes.number,
  isNoData: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  entries: PropTypes.arrayOf(POSITIONS_ENTRIES_PROPS).isRequired,
}

PositionsSnapshot.defaultProps = {
  totalPlUsd: null,
}

export default memo(PositionsSnapshot)
