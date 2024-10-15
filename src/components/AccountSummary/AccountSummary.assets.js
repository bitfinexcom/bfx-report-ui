import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import _map from 'lodash/map'
import _sumBy from 'lodash/sumBy'
import _groupBy from 'lodash/groupBy'
import { isEmpty } from '@bitfinex/lib-js-util-base'

import DataTable from 'ui/DataTable'
import { fetchAPositions } from 'state/positionsActive/actions'
import {
  getEntries,
  getPageLoading,
  getDataReceived,
} from 'state/positionsActive/selectors'
import { getIsSyncRequired, getIsFirstSyncing } from 'state/sync/selectors'

import { getPositionsColumns } from '../AppSummary/AppSummary.columns'

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

const SummaryByAsset = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const entries = useSelector(getEntries)
  const pageLoading = useSelector(getPageLoading)
  const dataReceived = useSelector(getDataReceived)
  const isFirstSync = useSelector(getIsFirstSyncing)
  const isSyncRequired = useSelector(getIsSyncRequired)
  const isLoading = isFirstSync || (!dataReceived && pageLoading)
  const isNoData = dataReceived && isEmpty(entries)
  const tableClasses = classNames('summary-positions-table', {
    'empty-table': isNoData,
  })

  useEffect(() => {
    if (!dataReceived && !pageLoading && !isSyncRequired) {
      dispatch(fetchAPositions())
    }
  }, [dataReceived, pageLoading, isSyncRequired])


  const columns = useMemo(
    () => getPositionsColumns({
      entries, t, isLoading, isNoData,
    }),
    [entries, t, isLoading, isNoData],
  )

  let showContent
  if (isNoData) {
    showContent = (
      <DataTable
        isNoData={isNoData}
        isLoading={isLoading}
        tableColumns={columns}
        className={tableClasses}
        numRows={isLoading ? 3 : 1}
        enableColumnResizing={false}
      />
    )
  } else {
    showContent = (
      <DataTable
        tableColumns={columns}
        className={tableClasses}
        enableColumnResizing={false}
        numRows={isLoading ? 3 : entries.length}
      />
    )
  }

  return (
    <div className='app-summary-item full-width-item'>
      <div className='app-summary-item-title--row'>
        <div>
          <div className='app-summary-item-title'>
            {t('summary.positions.title')}
          </div>
        </div>
      </div>
      {showContent}
    </div>
  )
}

export default SummaryByAsset
