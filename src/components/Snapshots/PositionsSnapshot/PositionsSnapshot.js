import React, { memo } from 'react'
import PropTypes from 'prop-types'
import compose from 'lodash/fp/compose'
import { withTranslation } from 'react-i18next'
import _isNumber from 'lodash/isNumber'

import DataTable from 'ui/DataTable'
import { fixedFloat } from 'ui/utils'
import { getFrameworkPositionsColumns } from 'utils/columns'

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
      )}

      <DataTable
        numRows={entries.length}
        tableColumns={positionsColumns}
      />
    </>
  )
}

PositionsSnapshot.propTypes = {
  totalPlUsd: PropTypes.number,
  entries: PropTypes.arrayOf(PropTypes.shape({
    amount: PropTypes.number,
    basePrice: PropTypes.number,
    liquidationPrice: PropTypes.number,
    marginFunding: PropTypes.number,
    marginFundingType: PropTypes.number,
    mtsUpdate: PropTypes.number,
    pair: PropTypes.string.isRequired,
    pl: PropTypes.number,
    plPerc: PropTypes.number,
  })),
  getFullTime: PropTypes.func,
  timeOffset: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
}

PositionsSnapshot.defaultProps = {
  entries: [],
  totalPlUsd: null,
  getFullTime: () => {},
}

export default compose(
  withTranslation('translations'),
  memo,
)(PositionsSnapshot)
