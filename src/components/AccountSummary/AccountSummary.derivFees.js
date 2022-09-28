import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'
import { Cell } from '@blueprintjs/table'

import DataTable from 'ui/DataTable'
import { formatAmount, formatFraction } from 'ui/utils'

const getColor = val => (val > 0 ? 'red' : 'green')

const getColumns = (props) => {
  const { makerFee, takerFee } = props
  const formattedMakerFee = `${formatFraction(makerFee * 100, { minDigits: 2 })}%`
  const formattedTakerFee = `${formatFraction(takerFee * 100, { minDigits: 2 })}%`

  return [
    {
      id: 'makerFee',
      name: makerFee > 0 ? 'column.maker_fees' : 'column.maker_rebate',
      width: 100,
      renderer: () => (
        <Cell tooltip={formattedMakerFee}>
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
        <Cell tooltip={formattedTakerFee}>
          {formatAmount(takerFee * 100, { color: getColor(takerFee), minDigits: 2 })}
          %
        </Cell>
      ),
      copyText: () => formattedTakerFee,
    },
  ]
}

const AccountSummaryDerivFees = (props) => {
  const {
    title,
    makerFee,
    takerFee,
    t,
  } = props

  const columns = getColumns({ makerFee, takerFee })

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
  title: PropTypes.string.isRequired,
  makerFee: PropTypes.number.isRequired,
  takerFee: PropTypes.number.isRequired,
  t: PropTypes.func.isRequired,
}

export default withTranslation('translations')(AccountSummaryDerivFees)
