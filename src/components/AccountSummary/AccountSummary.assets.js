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


const prepareAssetsData = (data) => {
  if (isEmpty(data)) return data
  const groupedBalances = _groupBy(data, 'currency')
  return _map(groupedBalances, (group, key) => ({ currency: key, balance: _sumBy(group, 'balance') }))
}

export const getColumns = ({
  t,
  entries,
  isNoData,
  isLoading,
}) => [
  {
    id: 'currency',
    name: 'column.currency',
    className: 'align-left',
    width: COLUMN_WIDTHS.currency,
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData, t('column.noResults'))
      const { currency } = entries[rowIndex]
      return getCell(mapSymbol(currency), t)
    },
    copyText: rowIndex => mapSymbol(entries[rowIndex].currency),
  },
  {
    id: 'balance',
    name: 'column.balance',
    width: COLUMN_WIDTHS.amount,
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const { balance } = entries[rowIndex]
      return getCell(fixedFloat(balance), t)
    },
    isNumericValue: true,
    copyText: rowIndex => fixedFloat(entries[rowIndex].balance),
  }]

const SummaryByAsset = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const pageLoading = useSelector(getPageLoading)
  const dataReceived = useSelector(getDataReceived)
  const entries = prepareAssetsData(useSelector(getEntries))
  const isNoData = isEmpty(entries)
  const isLoading = !dataReceived && pageLoading

  useEffect(() => {
    dispatch(fetchWallets())
  }, [])

  const columns = useMemo(
    () => getColumns({
      entries, t, isLoading, isNoData,
    }),
    [entries, t, isLoading, isNoData],
  )

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
