import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Cell } from '@blueprintjs/table'

import DataTable from 'ui/DataTable'
import { getTooltipContent } from 'utils/columns'
import { formatAmount, formatFraction } from 'ui/utils'

const getColumns = ({
  t,
  makerFee,
  takerFeeToFiat,
  takerFeeToStable,
  takerFeeToCrypto,
}) => {
  const formattedMakerFee = `${formatFraction(makerFee * 100, { minDigits: 2 })}%`
  const formattedTakerFeeToCrypto = `${formatFraction(takerFeeToCrypto * 100, { minDigits: 2 })}%`
  const formattedTakerFeeToFiat = `${formatFraction(takerFeeToFiat * 100, { minDigits: 2 })}%`
  const formattedTakerFeeToStable = `${formatFraction(takerFeeToStable * 100, { minDigits: 2 })}%`

  return [
    {
      id: 'makerFee',
      name: makerFee > 0 ? 'column.maker_fees' : 'column.maker_rebate',
      width: 100,
      renderer: () => (
        <Cell tooltip={getTooltipContent(formattedMakerFee, t)}>
          {formatAmount(makerFee * 100, { color: '#fff', minDigits: 2 })}
          %
        </Cell>
      ),
      copyText: () => formattedMakerFee,
    },
    {
      id: 'takerFeeCrypto',
      name: takerFeeToCrypto > 0 ? 'column.taker_fees_crypto' : 'column.taker_rebate_crypto',
      width: 140,
      renderer: () => (
        <Cell tooltip={getTooltipContent(formattedTakerFeeToCrypto, t)}>
          {formatAmount(takerFeeToCrypto * 100, { color: '#fff', minDigits: 2 })}
          %
        </Cell>
      ),
      copyText: () => formattedTakerFeeToCrypto,
    },
    {
      id: 'takerFeeFiat',
      name: takerFeeToFiat > 0 ? 'column.taker_fees_fiat' : 'column.taker_rebate_fiat',
      width: 140,
      renderer: () => (
        <Cell tooltip={getTooltipContent(formattedTakerFeeToFiat, t)}>
          {formatAmount(takerFeeToFiat * 100, { color: '#fff', minDigits: 2 })}
          %
        </Cell>
      ),
      copyText: () => formattedTakerFeeToFiat,
    },
    {
      id: 'takerFeeStable',
      name: takerFeeToStable > 0 ? 'column.taker_fees_stable' : 'column.taker_rebate_stable',
      width: 140,
      renderer: () => (
        <Cell tooltip={getTooltipContent(formattedTakerFeeToStable, t)}>
          {formatAmount(takerFeeToStable * 100, { color: '#fff', minDigits: 2 })}
          %
        </Cell>
      ),
      copyText: () => formattedTakerFeeToStable,
    },
  ]
}

const AppSummaryFees = ({
  t,
  data,
  title,
}) => {
  const {
    makerFee,
    takerFeeToFiat,
    takerFeeToStable,
    takerFeeToCrypto,
  } = data

  const columns = getColumns({
    t,
    makerFee: makerFee || 0,
    takerFeeToCrypto: takerFeeToCrypto || 0,
    takerFeeToFiat: takerFeeToFiat || 0,
    takerFeeToStable: takerFeeToStable || 0,
  })

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

AppSummaryFees.propTypes = {
  data: PropTypes.shape({
    makerFee: PropTypes.number,
    takerFeeToCrypto: PropTypes.number,
    takerFeeToFiat: PropTypes.number,
    takerFeeToStable: PropTypes.number,
  }).isRequired,
  title: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
}

export default memo(AppSummaryFees)
