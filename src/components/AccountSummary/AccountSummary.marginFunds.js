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
      width: window.innerWidth > 375
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
        const { amount } = data[rowIndex]
        const fixedAmount = fixedFloat(amount)
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={fixedAmount}
          >
            {formatAmount(amount)}
          </Cell>
        )
      },
      copyText: rowIndex => fixedFloat(data[rowIndex].amount),
    },
  ]
}

const AccountSummaryMarginFunds = (props) => {
  const { data, t } = props

  const formattedData = Object.keys(data).map(key => ({
    curr: key,
    amount: data[key],
  }))

  const columns = getColumns({ data: formattedData })

  return (
    <div className='section-account-summary-data-item'>
      <div>{t('accountsummary.margin_funds')}</div>
      <DataTable
        numRows={formattedData.length}
        tableColumns={columns}
      />
    </div>
  )
}

AccountSummaryMarginFunds.propTypes = {
  data: PropTypes.objectOf(PropTypes.number).isRequired,
  t: PropTypes.func.isRequired,
}

export default withTranslation('translations')(AccountSummaryMarginFunds)
