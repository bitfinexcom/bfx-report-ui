import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Cell } from '@blueprintjs/table'

import DataTable from 'ui/DataTable'
import { getTooltipContent } from 'utils/columns'
import { formatAmount, formatFraction } from 'ui/utils'

const getColor = val => (val > 0 ? 'red' : 'green')

const getColumns = ({ makerFee, takerFee, t }) => {
  const formattedMakerFee = `${formatFraction(makerFee * 100, { minDigits: 2 })}%`
  const formattedTakerFee = `${formatFraction(takerFee * 100, { minDigits: 2 })}%`

  return [
    {
      id: 'makerFee',
      name: makerFee > 0 ? 'column.maker_fees' : 'column.maker_rebate',
      width: 100,
      renderer: () => (
        <Cell tooltip={getTooltipContent(formattedMakerFee, t)}>
          {formatAmount(makerFee * 100, { color: getColor(makerFee), minDigits: 2 })}
          %
        </Cell>
      ),
      copyText: () => formattedMakerFee,
    },
    {
      id: 'takerFee',
      name: takerFee > 0 ? 'column.taker_fees' : 'column.taker_rebate',
      width: 100,
      renderer: () => (
        <Cell tooltip={getTooltipContent(formattedTakerFee, t)}>
          {formatAmount(takerFee * 100, { color: getColor(takerFee), minDigits: 2 })}
          %
        </Cell>
      ),
      copyText: () => formattedTakerFee,
    },
  ]
}

const AccountSummaryDerivFees = ({
  t,
  title,
  makerFee,
  takerFee,
}) => {
  const columns = getColumns({ makerFee, takerFee, t })

  return (
    <div className='section-account-summary-data-item'>
      <div>
        {t(title)}
        <div>{t('accountsummary.fees_explain')}</div>
      </div>
      <DataTable
        numRows={1}
        tableColumns={columns}
      />
    </div>
  )
}

AccountSummaryDerivFees.propTypes = {
  t: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  makerFee: PropTypes.number.isRequired,
  takerFee: PropTypes.number.isRequired,
}

export default memo(AccountSummaryDerivFees)
