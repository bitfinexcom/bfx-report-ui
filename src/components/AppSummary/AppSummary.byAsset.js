import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { Cell } from '@blueprintjs/table'

import { formatFee } from 'ui/utils'
import {
  getSummaryByAssetTotal,
  getSummaryByAssetEntries,
} from 'state/summaryByAsset/selectors'
import CollapsedTable from 'ui/CollapsedTable'

const prepareData = (entries, total) => (
  [...entries, { currency: 'Total', ...total }]
)

const getColumns = ({
  makerFee,
  isTurkishSite,
  derivTakerFee,
  takerFeeToFiat,
  takerFeeToStable,
  takerFeeToCrypto,
  derivMakerRebate,
}) => [
  {
    id: 'makerFee',
    name: 'summary.fees.maker',
    width: 100,
    renderer: () => (
      <Cell>
        {formatFee(makerFee)}
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
        {formatFee(takerFeeToCrypto)}
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
        {formatFee(takerFeeToFiat)}
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
        {formatFee(takerFeeToStable)}
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
        {formatFee(derivMakerRebate)}
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
        {formatFee(derivTakerFee)}
        %
      </Cell>
    ),
  }] : []),
]

const AppSummaryByAsset = ({
  t,
  data,
  isTurkishSite,
}) => {
  const total = useSelector(getSummaryByAssetTotal)
  const entries = useSelector(getSummaryByAssetEntries)
  const preparedData = prepareData(entries, total)

  const {
    makerFee = 0,
    derivTakerFee = 0,
    takerFeeToFiat = 0,
    takerFeeToStable = 0,
    takerFeeToCrypto = 0,
    derivMakerRebate = 0,
  } = data

  const columns = getColumns({
    makerFee,
    isTurkishSite,
    derivTakerFee,
    takerFeeToFiat,
    takerFeeToStable,
    takerFeeToCrypto,
    derivMakerRebate,
  })

  return (
    <div className='app-summary-item full-width-item'>
      <div className='app-summary-item-title'>
        {t('summary.by_asset.title')}
      </div>
      <div className='app-summary-item-sub-title'>
        {t('summary.by_asset.sub_title')}
      </div>
      <CollapsedTable
        numRows={1}
        tableColumns={columns}
      />
    </div>
  )
}

AppSummaryByAsset.propTypes = {
  data: PropTypes.shape({
    derivMakerRebate: PropTypes.number,
    derivTakerFee: PropTypes.number,
    makerFee: PropTypes.number,
    takerFeeToCrypto: PropTypes.number,
    takerFeeToFiat: PropTypes.number,
    takerFeeToStable: PropTypes.number,
  }).isRequired,
  t: PropTypes.func.isRequired,
  isTurkishSite: PropTypes.bool.isRequired,
}

export default memo(AppSummaryByAsset)
