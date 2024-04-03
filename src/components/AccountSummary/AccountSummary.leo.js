import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Cell } from '@blueprintjs/table'

import DataTable from 'ui/DataTable'
import { fixedFloat, formatAmount } from 'ui/utils'
import { getCellLoader, getCellNoData, getTooltipContent } from 'utils/columns'

const getColumns = ({
  t,
  leoLev,
  isNoData,
  isLoading,
  leoAmountAvg,
}) => {
  const formattedLeoAmountAvg = fixedFloat(leoAmountAvg)
  return [
    {
      id: 'leo_level',
      name: 'accountsummary.leo_level',
      width: 100,
      renderer: () => {
        if (isLoading) return getCellLoader(14, 72)
        if (isNoData) return getCellNoData(t('column.noResults'))
        return (
          <Cell tooltip={getTooltipContent(leoLev, t)}>
            {leoLev}
          </Cell>
        )
      },
      copyText: () => leoLev,
    },
    {
      id: 'leo_average_amount',
      name: 'accountsummary.average_amount',
      width: 120,
      renderer: () => {
        if (isLoading) return getCellLoader(14, 72)
        if (isNoData) return getCellNoData()
        return (
          <Cell tooltip={getTooltipContent(formattedLeoAmountAvg, t)}>
            {formatAmount(formattedLeoAmountAvg)}
          </Cell>
        )
      },
      copyText: () => leoAmountAvg,
    },
  ]
}

const AccountSummaryLeo = ({
  data, t, isLoading, isNoData,
}) => {
  const { leoLev, leoAmountAvg } = data

  const columns = getColumns({
    leoLev, leoAmountAvg, t, isLoading, isNoData,
  })

  return (
    <div className='section-account-summary-data-item'>
      <div className='data-item--divider' />
      <DataTable
        numRows={1}
        tableColumns={columns}
      />
    </div>
  )
}

AccountSummaryLeo.propTypes = {
  data: PropTypes.shape({
    leoLev: PropTypes.number,
    leoAmountAvg: PropTypes.number,
  }),
  t: PropTypes.func.isRequired,
  isNoData: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
}

AccountSummaryLeo.defaultProps = {
  data: PropTypes.shape({
    leoLev: 0,
    leoAmountAvg: 0,
  }),
}

export default memo(AccountSummaryLeo)
