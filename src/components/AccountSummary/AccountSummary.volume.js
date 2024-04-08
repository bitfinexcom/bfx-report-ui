import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Cell } from '@blueprintjs/table'

import DataTable from 'ui/DataTable'
import { fixedFloat, formatAmount } from 'ui/utils'
import {
  COLUMN_WIDTHS,
  getCellLoader,
  getCellNoData,
  getTooltipContent,
} from 'utils/columns'

const getColumns = ({
  t,
  data,
  isNoData,
  isLoading,
}) => [
  {
    id: 'currency',
    name: 'column.currency',
    className: 'align-left',
    width: COLUMN_WIDTHS.SYMBOL,
    renderer: (rowIndex) => {
      if (isLoading) return getCellLoader(14, 72)
      if (isNoData) return getCellNoData(t('column.noResults'))
      const { curr } = data[rowIndex]
      return (
        <Cell tooltip={getTooltipContent(curr, t)}>
          {curr}
        </Cell>
      )
    },
    copyText: rowIndex => data[rowIndex].curr,
  },
  {
    id: 'volume',
    name: 'column.volume',
    width: COLUMN_WIDTHS.AMOUNT,
    renderer: (rowIndex) => {
      if (isLoading) return getCellLoader(14, 72)
      if (isNoData) return getCellNoData()
      const { curr, vol } = data[rowIndex]
      const fixedVolume = fixedFloat(vol)
      return (
        <Cell
          className='bitfinex-text-align-right'
          tooltip={getTooltipContent(fixedVolume, t)}
        >
          {formatAmount(vol, {
            digits: 2,
            formatThousands: true,
            dollarSign: curr === 'USD' || curr === 'Total (USD)',
          })}
        </Cell>
      )
    },
    copyText: rowIndex => fixedFloat(data[rowIndex].vol),
  },
]

const AccountSummaryVolume = ({
  t,
  data,
  isNoData,
  isLoading,
}) => {
  const columns = getColumns({
    data, t, isNoData, isLoading,
  })

  return (
    <div className='section-account-summary-data-item'>
      <div>{t('accountsummary.30dVolume')}</div>
      <DataTable
        tableColumns={columns}
        enableColumnResizing={false}
        numRows={isLoading ? 1 : data.length}
      />
    </div>
  )
}

const VOLUME_ENTRIES_PROPS = PropTypes.shape({
  curr: PropTypes.string.isRequired,
  vol: PropTypes.number.isRequired,
})

AccountSummaryVolume.propTypes = {
  t: PropTypes.func.isRequired,
  isNoData: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  data: PropTypes.arrayOf(VOLUME_ENTRIES_PROPS).isRequired,
}

export default memo(AccountSummaryVolume)
