import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import _map from 'lodash/map'
import _sumBy from 'lodash/sumBy'
import _groupBy from 'lodash/groupBy'
import { isEmpty } from '@bitfinex/lib-js-util-base'

import DataTable from 'ui/DataTable'
import { fixedFloat } from 'ui/utils'
import { mapSymbol } from 'state/symbols/utils'
import { fetchWallets } from 'state/wallets/actions'
import {
  getCell,
  getCellState,
  COLUMN_WIDTHS,
} from 'utils/columns'
import {
  getEntries,
  getPageLoading,
  getDataReceived,
} from 'state/wallets/selectors'

const walletsMock = [
  {
    type: 'contribution',
    currency: 'UST',
    balance: 500,
    unsettledInterest: 0,
    balanceAvailable: 500,
    description: null,
    meta: null,
    _isDataFromApiV2: true,
  },
  {
    type: 'creditline',
    currency: 'UST',
    balance: 500,
    unsettledInterest: 0,
    balanceAvailable: 500,
    description: null,
    meta: null,
    _isDataFromApiV2: true,
  },
  {
    type: 'funding',
    currency: 'ETH',
    balance: 75.19748273,
    unsettledInterest: 0,
    balanceAvailable: 9.4150902,
    description: null,
    meta: null,
    _isDataFromApiV2: true,
  },
  {
    type: 'funding',
    currency: 'IOT',
    balance: 101.65617908,
    unsettledInterest: 0,
    balanceAvailable: 101.65617908,
    description: null,
    meta: null,
    _isDataFromApiV2: true,
  },
  {
    type: 'funding',
    currency: 'JPY',
    balance: 23468.18510406,
    unsettledInterest: 0,
    balanceAvailable: 23468.18510406,
    description: null,
    meta: null,
    _isDataFromApiV2: true,
  },
  {
    type: 'funding',
    currency: 'USD',
    balance: 543.59104978,
    unsettledInterest: 0,
    balanceAvailable: 0.85983473,
    description: null,
    meta: null,
    _isDataFromApiV2: true,
  },
  {
    type: 'funding',
    currency: 'UST',
    balance: 200.72123561,
    unsettledInterest: 0,
    balanceAvailable: 200.72123561,
    description: null,
    meta: null,
    _isDataFromApiV2: true,
  },
  {
    type: 'exchange',
    currency: 'BTC',
    balance: 1.0745711,
    unsettledInterest: 0,
    balanceAvailable: 1.0745711,
    description: null,
    meta: null,
    _isDataFromApiV2: true,
  },
  {
    type: 'exchange',
    currency: 'ETH',
    balance: 41.27958958,
    unsettledInterest: 0,
    balanceAvailable: 41.27958958,
    description: null,
    meta: null,
    _isDataFromApiV2: true,
  },
  {
    type: 'exchange',
    currency: 'EUR',
    balance: 550.27976385,
    unsettledInterest: 0,
    balanceAvailable: 550.27976385,
    description: null,
    meta: null,
    _isDataFromApiV2: true,
  },
  {
    type: 'exchange',
    currency: 'IOT',
    balance: 301.22971424,
    unsettledInterest: 0,
    balanceAvailable: 301.22971424,
    description: null,
    meta: null,
    _isDataFromApiV2: true,
  },
  {
    type: 'exchange',
    currency: 'JPY',
    balance: 46691.61216429,
    unsettledInterest: 0,
    balanceAvailable: 46691.61216429,
    description: null,
    meta: null,
    _isDataFromApiV2: true,
  },
  {
    type: 'exchange',
    currency: 'USD',
    balance: 21836.75178168,
    unsettledInterest: 0,
    balanceAvailable: 21836.75178168,
    description: null,
    meta: null,
    _isDataFromApiV2: true,
  },
  {
    type: 'exchange',
    currency: 'UST',
    balance: 1336.81517648,
    unsettledInterest: 0,
    balanceAvailable: 1336.81517648,
    description: null,
    meta: null,
    _isDataFromApiV2: true,
  },
  {
    type: 'margin',
    currency: 'USD',
    balance: 320.00399401,
    unsettledInterest: 0,
    balanceAvailable: 320.00399401,
    description: null,
    meta: null,
    _isDataFromApiV2: true,
  },
  {
    type: 'margin',
    currency: 'USTF0',
    balance: 150,
    unsettledInterest: 0,
    balanceAvailable: 150,
    description: null,
    meta: null,
    _isDataFromApiV2: true,
  },
]

const prepareAssetsData = (data) => {
  const groupedBalances = _groupBy(data, 'currency')
  return _map(groupedBalances, (group, key) => ({ currency: key, balance: _sumBy(group, 'balance') }))
}

export const getColumns = ({
  t,
  isNoData,
  isLoading,
  preparedData,
}) => [
  {
    id: 'currency',
    name: 'column.currency',
    className: 'align-left',
    width: COLUMN_WIDTHS.currency,
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData, t('column.noResults'))
      const { currency } = preparedData[rowIndex]
      return getCell(mapSymbol(currency), t)
    },
    copyText: rowIndex => mapSymbol(preparedData[rowIndex].currency),
  },
  {
    id: 'balance',
    name: 'column.balance',
    width: COLUMN_WIDTHS.amount,
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const { balance } = preparedData[rowIndex]
      return getCell(fixedFloat(balance), t)
    },
    isNumericValue: true,
    copyText: rowIndex => fixedFloat(preparedData[rowIndex].balance),
  }]

const SummaryByAsset = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const entries = useSelector(getEntries)
  // console.log('+++', entries)
  const pageLoading = useSelector(getPageLoading)
  const dataReceived = useSelector(getDataReceived)
  const isLoading = !dataReceived && pageLoading
  const isNoData = isEmpty(entries)

  useEffect(() => {
    dispatch(fetchWallets())
  }, [])

  const preparedData = prepareAssetsData(entries)

  const columns = useMemo(
    () => getColumns({
      preparedData, t, isLoading, isNoData,
    }),
    [preparedData, t, isLoading, isNoData],
  )

  // const

  console.log('+++columns', columns)

  return (
    <div className='section-account-summary-data-item'>
      <div>{t('summary.by_asset.title')}</div>
      <DataTable
        tableColumns={columns}
        enableColumnResizing={false}
        numRows={(isLoading || isNoData) ? 1 : entries.length}
      />
    </div>
  )
}

export default SummaryByAsset
