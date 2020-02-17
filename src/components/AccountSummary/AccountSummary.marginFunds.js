import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'
import { Cell } from '@blueprintjs/table'

import DataTable from 'ui/DataTable'
import { fixedFloat } from 'ui/utils'
import { COLUMN_WIDTHS } from 'utils/columns'

const getColumns = (props) => {
  const { data } = props

  return [
    {
      id: 'currency',
      name: 'column.currency',
      width: 250,
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
            {fixedAmount}
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
    <Fragment>
      <h4>{t('accountsummary.margin_funds')}</h4>
      <DataTable
        numRows={formattedData.length}
        tableColumns={columns}
      />
    </Fragment>
  )
}

AccountSummaryMarginFunds.propTypes = {
  data: PropTypes.objectOf(PropTypes.number).isRequired,
  t: PropTypes.func.isRequired,
}

export default withTranslation('translations')(AccountSummaryMarginFunds)
