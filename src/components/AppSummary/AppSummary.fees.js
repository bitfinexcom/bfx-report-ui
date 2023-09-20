import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Cell } from '@blueprintjs/table'

import DataTable from 'ui/DataTable'
import { formatAmount } from 'ui/utils'

const getColumns = ({
  makerFee,
  derivTakerFee,
  takerFeeToFiat,
  takerFeeToStable,
  takerFeeToCrypto,
  derivMakerRebate,
  isTurkishSite,
}) => [
  {
    id: 'makerFee',
    name: 'summary.fees.maker',
    width: 100,
    renderer: () => (
      <Cell>
        {formatAmount(makerFee * 100, { color: '#fff', minDigits: 2 })}
        %
      </Cell>
    ),
  },
  {
    id: 'takerFeeCrypto',
    name: 'summary.fees.taker_crypto',
    width: 140,
    renderer: () => (
      <Cell>
        {formatAmount(takerFeeToCrypto * 100, { color: '#fff', minDigits: 2 })}
        %
      </Cell>
    ),
  },
  {
    id: 'takerFeeFiat',
    name: 'summary.fees.taker_fiat',
    width: 140,
    renderer: () => (
      <Cell>
        {formatAmount(takerFeeToFiat * 100, { color: '#fff', minDigits: 2 })}
        %
      </Cell>
    ),
  },
  {
    id: 'takerFeeStable',
    name: 'summary.fees.taker_stables',
    width: 140,
    renderer: () => (
      <Cell>
        {formatAmount(takerFeeToStable * 100, { color: '#fff', minDigits: 2 })}
        %
      </Cell>
    ),
  },
  ...(!isTurkishSite ? [{
    id: 'derivMakerRebate',
    name: 'summary.fees.deriv_maker',
    width: 140,
    renderer: () => (
      <Cell>
        {formatAmount(derivMakerRebate * 100, { color: '#fff', minDigits: 2 })}
        %
      </Cell>
    ),
  },
  {
    id: 'derivTakerFee',
    name: 'summary.fees.deriv_taker',
    width: 140,
    renderer: () => (
      <Cell>
        {formatAmount(derivTakerFee * 100, { color: '#fff', minDigits: 2 })}
        %
      </Cell>
    ),
  }] : []),
]

const AppSummaryFees = ({
  t,
  data,
  title,
  isTurkishSite,
}) => {
  const {
    makerFee,
    derivTakerFee,
    takerFeeToFiat,
    takerFeeToStable,
    takerFeeToCrypto,
    derivMakerRebate,
  } = data

  const columns = getColumns({
    isTurkishSite,
    makerFee: makerFee || 0,
    takerFeeToCrypto: takerFeeToCrypto || 0,
    takerFeeToFiat: takerFeeToFiat || 0,
    takerFeeToStable: takerFeeToStable || 0,
    derivMakerRebate: derivMakerRebate || 0,
    derivTakerFee: derivTakerFee || 0,
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
    derivMakerRebate: PropTypes.number,
    derivTakerFee: PropTypes.number,
    makerFee: PropTypes.number,
    takerFeeToCrypto: PropTypes.number,
    takerFeeToFiat: PropTypes.number,
    takerFeeToStable: PropTypes.number,
  }).isRequired,
  title: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
  isTurkishSite: PropTypes.bool.isRequired,
}

export default memo(AppSummaryFees)
