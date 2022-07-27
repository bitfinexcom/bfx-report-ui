import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'
import { Cell } from '@blueprintjs/table'

import DataTable from 'ui/DataTable'
import { fixedFloat, formatAmount } from 'ui/utils'
import { COLUMN_WIDTHS } from 'utils/columns'

export const getColumns = (props) => {
  const { data } = props

  return [
    {
      id: 'currency',
      name: 'column.currency',
      width: window.innerWidth > 390
        ? 250
        : COLUMN_WIDTHS.currency,
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
      width: COLUMN_WIDTHS.amount,
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
}

const AccountSummaryPaidFees = (props) => {
  const {
    data, t, title, total,
  } = props

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
  data: PropTypes.objectOf(PropTypes.number).isRequired,
  title: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  t: PropTypes.func.isRequired,
}

export default withTranslation('translations')(AccountSummaryPaidFees)
