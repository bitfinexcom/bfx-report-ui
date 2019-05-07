import React, { Fragment, PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import {
  Button,
  Card,
  Elevation,
  Intent,
  Position,
  Tooltip,
} from '@blueprintjs/core'
import { DateInput, TimePrecision } from '@blueprintjs/datetime'
import _keys from 'lodash/keys'
import _sortBy from 'lodash/sortBy'

import Loading from 'ui/Loading'
import NoData from 'ui/NoData'
import RefreshButton from 'ui/RefreshButton'
import DataTable from 'ui/DataTable'
import PieChart from 'ui/Charts/PieChart'
import { DEFAULT_DATETIME_FORMAT, momentFormatter } from 'state/utils'
import { isValidTimeStamp } from 'state/query/utils'
import { platform } from 'var/config'

import getColumns from './ConcentrationRisk.columns'
import { propTypes, defaultProps } from './ConcentrationRisk.props'

class ConcentrationRisk extends PureComponent {
  constructor(props) {
    super(props)
    const { currentTime } = props

    this.state = {
      timestamp: currentTime ? new Date(currentTime) : null,
    }
  }

  componentDidMount() {
    const { loading, fetchWallets } = this.props
    if (loading) {
      fetchWallets()
    }
  }

  parseData = (filteredData) => {
    const summaryData = filteredData.reduce((acc, entry) => {
      const { currency, balanceUsd } = entry
      if (balanceUsd) {
        acc[currency] = (acc[currency] || 0) + balanceUsd
      }
      return acc
    }, {})

    const balanceSumm = _keys(summaryData).reduce((acc, key) => acc + summaryData[key], 0)
    const tableData = _keys(summaryData).map(key => ({
      currency: key,
      balanceUsd: summaryData[key],
    }))

    const chartData = tableData.map(({ currency, balanceUsd }) => ({
      name: currency,
      value: balanceUsd * 100 / balanceSumm,
    }))

    return {
      tableData: _sortBy(tableData, ['balanceUsd']).reverse(),
      chartData,
    }
  }

  handleDateChange = (time) => {
    const end = time && time.getTime()
    if (isValidTimeStamp(end) || time === null) {
      this.setState({ timestamp: time })
    }
  }

  handleQuery = (e) => {
    e.preventDefault()
    const { fetchWallets } = this.props
    const { timestamp } = this.state
    const time = timestamp ? timestamp.getTime() : null
    fetchWallets(time)
  }

  render() {
    const {
      currentTime,
      entries,
      loading,
      refresh,
      t,
      timezone,
    } = this.props
    const { timestamp } = this.state
    const hasNewTime = timestamp ? currentTime !== timestamp.getTime() : !!currentTime !== !!timestamp
    const timePrecision = platform.showSyncMode ? TimePrecision.SECOND : undefined
    const { formatDate, parseDate } = momentFormatter(DEFAULT_DATETIME_FORMAT, timezone)

    const filteredData = entries.filter(entry => entry.balanceUsd)

    const { tableData, chartData } = this.parseData(filteredData)
    const numRows = tableData.length
    const tableColums = getColumns({
      data: tableData,
      t,
    })

    const renderTimeSelection = (
      <Fragment>
        <Tooltip
          content={(
            <span>
              {t('concentrationrisk.query.tooltip')}
            </span>
          )}
          position={Position.TOP}
          usePortal
        >
          <DateInput
            formatDate={formatDate}
            parseDate={parseDate}
            onChange={this.handleDateChange}
            value={timestamp}
            timePrecision={timePrecision}
          />
        </Tooltip>
        <Button
          onClick={this.handleQuery}
          intent={hasNewTime ? Intent.PRIMARY : null}
          disabled={!hasNewTime}
        >
          {t('concentrationrisk.query.title')}
        </Button>
      </Fragment>
    )
    let showContent
    if (loading) {
      showContent = (
        <Loading title='concentrationrisk.title' />
      )
    } else if (!chartData.length) {
      showContent = (
        <Fragment>
          <h4>
            {t('concentrationrisk.title')}
            &nbsp;
            {renderTimeSelection}
            &nbsp;
            <RefreshButton handleClickRefresh={refresh} />
          </h4>
          <NoData descId='concentrationrisk.nodata' />
        </Fragment>
      )
    } else {
      showContent = (
        <Fragment>
          <h4>
            {t('concentrationrisk.title')}
            &nbsp;
            {renderTimeSelection}
            &nbsp;
            <RefreshButton handleClickRefresh={refresh} />
          </h4>
          <div className='concentration-risk-data'>
            <DataTable
              numRows={numRows}
              tableColums={tableColums}
            />
            <div className='concentration-risk-data-chart'>
              <PieChart data={chartData} />
            </div>
          </div>
        </Fragment>
      )
    }

    return (
      <Card elevation={Elevation.ZERO} className='col-lg-12 col-md-12 col-sm-12 col-xs-12 concentration-risk'>
        {showContent}
      </Card>
    )
  }
}

ConcentrationRisk.propTypes = propTypes
ConcentrationRisk.defaultProps = defaultProps

export default withTranslation('translations')(ConcentrationRisk)
