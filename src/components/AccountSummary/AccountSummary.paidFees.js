import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Cell } from '@blueprintjs/table'

import DataTable from 'ui/DataTable'
import { COLUMN_WIDTHS } from 'utils/columns'
import { fixedFloat, formatAmount } from 'ui/utils'

export const getColumns = ({ data }) => [
  {
    id: 'currency',
    name: 'column.currency',
    className: 'align-left',
    width: window.innerWidth > 390
      ? 250
      : COLUMN_WIDTHS.SYMBOL,
    renderer: (rowIndex) => {
      const { curr } = data[rowIndex]
      return (
        <Cell tooltip={curr}>
          {curr}
        </Cell>
      )
    },
    copyText: rowIndex => data[rowIndex].curr,
  },
  {
    id: 'volume',
    name: 'column.amount',
    width: COLUMN_WIDTHS.AMOUNT,
    renderer: (rowIndex) => {
      const { curr, amount } = data[rowIndex]
      const fixedAmount = fixedFloat(amount)
      return (
        <Cell
          className='bitfinex-text-align-right'
          tooltip={fixedAmount}
        >
          {formatAmount(amount, {
            digits: 2,
            formatThousands: true,
            dollarSign: curr === 'USD' || curr === 'Total (USD)',
          })}
        </Cell>
      )
    },
    copyText: rowIndex => fixedFloat(data[rowIndex].amount),
  },
]

const AccountSummaryPaidFees = ({
  t,
  data,
  total,
  title,
}) => {
  const formattedData = Object.keys(data).map(key => ({
    curr: key,
    amount: data[key],
  }))
  formattedData.push({
    curr: 'Total (USD)',
    amount: total,
  })

  const columns = getColumns({ data: formattedData })

  return (
    <div className='section-account-summary-data-item'>
      <div>{t(title)}</div>
      <DataTable
        numRows={formattedData.length}
        tableColumns={columns}
      />
    </div>
  )
}

AccountSummaryPaidFees.propTypes = {
  t: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  data: PropTypes.objectOf(PropTypes.number).isRequired,
}

export default memo(AccountSummaryPaidFees)
