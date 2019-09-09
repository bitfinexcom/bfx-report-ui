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
import _keys from 'lodash/keys'
import _sortBy from 'lodash/sortBy'

import DateInput from 'ui/DateInput'
import Loading from 'ui/Loading'
import NoData from 'ui/NoData'
import RefreshButton from 'ui/RefreshButton'
import DataTable from 'ui/DataTable'
import PieChart from 'ui/Charts/PieChart'
import { fixedFloat } from 'ui/utils'
import { isValidTimeStamp } from 'state/query/utils'

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
    } = this.props
    const { timestamp } = this.state
    const hasNewTime = timestamp ? currentTime !== timestamp.getTime() : !!currentTime !== !!timestamp

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
          <DateInput onChange={this.handleDateChange} value={timestamp} />
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
    } else if (!entries.length) {
      showContent = (
        <Fragment>
          <h4>
            {t('concentrationrisk.title')}
            {' '}
            {renderTimeSelection}
            {' '}
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
            {' '}
            {renderTimeSelection}
            {' '}
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
