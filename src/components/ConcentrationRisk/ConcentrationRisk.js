import React, { useMemo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Elevation } from '@blueprintjs/core'
import _keys from 'lodash/keys'
import _sortBy from 'lodash/sortBy'
import { isEmpty } from '@bitfinex/lib-js-util-base'

import {
  SectionHeader,
  SectionHeaderRow,
  SectionHeaderItem,
  SectionHeaderTitle,
  SectionHeaderItemLabel,
} from 'ui/SectionHeader'
import DataTable from 'ui/DataTable'
import DateInput from 'ui/DateInput'
import PieChart from 'ui/Charts/PieChart'
import InitSyncNote from 'ui/InitSyncNote'
import SectionSwitch from 'ui/SectionSwitch'
import { fixedFloat } from 'ui/utils'
import { refresh, setTimestamp } from 'state/wallets/actions'
import { setShouldRefreshAfterSync } from 'state/sync/actions'
import {
  getEntries,
  getTimestamp,
  getPageLoading,
  getDataReceived,
} from 'state/wallets/selectors'
import {
  getIsSyncRequired,
  getIsFirstSyncing,
  getShouldRefreshAfterSync,
} from 'state/sync/selectors'
import useFetchLifecycle from 'hooks/useFetchLifecycle'
import queryConstants from 'state/query/constants'
import { isValidTimeStamp } from 'state/query/utils'

import { getColumns } from './ConcentrationRisk.columns'

const TYPE = queryConstants.MENU_CONCENTRATION_RISK

const parseData = (filteredData) => {
  let allBalance = 0
  const summaryData = filteredData.reduce((acc, entry) => {
    const { currency, balanceUsd } = entry
    if (balanceUsd) {
      acc[currency] = (acc[currency] || 0) + balanceUsd
      allBalance += balanceUsd
    }
    return acc
  }, {})

  const tableData = _sortBy(_keys(summaryData).map((key) => {
    const balanceUsd = summaryData[key]
    const percent = ((balanceUsd / allBalance) * 100)

    return {
      currency: key,
      balanceUsd,
      percent: fixedFloat(percent),
    }
  }), 'balanceUsd').reverse()

  const chartData = tableData
    .filter(({ percent }) => percent > 0.1)
    .map(({ currency, balanceUsd }) => ({
      name: currency,
      value: balanceUsd,
    }))

  return {
    tableData: _sortBy(tableData, ['balanceUsd']).reverse(),
    chartData,
  }
}

const ConcentrationRisk = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const entries = useSelector(getEntries)
  const currentTime = useSelector(getTimestamp)
  const pageLoading = useSelector(getPageLoading)
  const dataReceived = useSelector(getDataReceived)
  const isSyncRequired = useSelector(getIsSyncRequired)
  const isFirstSyncing = useSelector(getIsFirstSyncing)
  const shouldRefreshAfterSync = useSelector(getShouldRefreshAfterSync)

  useFetchLifecycle(TYPE, {
    pageLoading,
    dataReceived,
    isSyncRequired,
    shouldRefreshAfterSync,
    params: { timestamp: currentTime },
    fetchData: () => dispatch(refresh()),
    setShouldRefreshAfterSync: (v) => dispatch(setShouldRefreshAfterSync(v)),
  })

  const dateValue = useMemo(
    () => (currentTime ? new Date(currentTime) : null),
    [currentTime],
  )

  const { tableData, chartData } = useMemo(
    () => parseData(entries.filter(entry => entry.balanceUsd)),
    [entries],
  )

  const handleDateChange = useCallback((time) => {
    const end = time && time.getTime()
    if (isValidTimeStamp(end) || time === null) {
      dispatch(setTimestamp(end))
    }
  }, [dispatch])

  const isNoData = isEmpty(entries)
  const isLoading = !dataReceived && pageLoading
  const tableColumns = getColumns({
    t,
    isNoData,
    isLoading,
    data: tableData,
  })

  let showContent
  if (isFirstSyncing) {
    showContent = <InitSyncNote />
  } else if (isNoData) {
    showContent = (
      <div className='concentration-risk-data-table'>
        <DataTable
          section={TYPE}
          isNoData={isNoData}
          isLoading={isLoading}
          tableColumns={tableColumns}
          numRows={isLoading ? 5 : 1}
        />
      </div>
    )
  } else {
    showContent = (
      <div className='concentration-risk-data'>
        <div className='concentration-risk-data-table'>
          <DataTable
            tableColumns={tableColumns}
            enableColumnResizing={false}
            numRows={isLoading ? 5 : tableData.length}
          />
        </div>
        <div className='concentration-risk-data-chart'>
          <PieChart data={chartData} />
        </div>
      </div>
    )
  }

  return (
    <Card
      elevation={Elevation.ZERO}
      className='col-lg-12 col-md-12 col-sm-12 col-xs-12 concentration-risk no-table-scroll'
    >
      <SectionHeader>
        <SectionHeaderTitle>
          {t('concentrationrisk.title')}
        </SectionHeaderTitle>
        <SectionSwitch target={TYPE} />
        <SectionHeaderRow>
          <SectionHeaderItem>
            <SectionHeaderItemLabel>
              {t('query.endTime')}
            </SectionHeaderItemLabel>
            <DateInput
              defaultValue={dateValue}
              isDisabled={isFirstSyncing}
              onChange={handleDateChange}
            />
          </SectionHeaderItem>
        </SectionHeaderRow>
      </SectionHeader>
      {showContent}
    </Card>
  )
}

export default ConcentrationRisk
