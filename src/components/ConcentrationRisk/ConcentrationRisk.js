import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'
import { Card, Elevation } from '@blueprintjs/core'
import _keys from 'lodash/keys'
import _sortBy from 'lodash/sortBy'

import {
  SectionHeader,
  SectionHeaderTitle,
  SectionHeaderRow,
  SectionHeaderItem,
  SectionHeaderItemLabel,
} from 'ui/SectionHeader'
import DateInput from 'ui/DateInput'
import Loading from 'ui/Loading'
import NoData from 'ui/NoData'
import QueryButton from 'ui/QueryButton'
import RefreshButton from 'ui/RefreshButton'
import DataTable from 'ui/DataTable'
import PieChart from 'ui/Charts/PieChart'
import { fixedFloat } from 'ui/utils'
import { isValidTimeStamp } from 'state/query/utils'

import getColumns from './ConcentrationRisk.columns'

class ConcentrationRisk extends PureComponent {
  static propTypes = {
    currentTime: PropTypes.number,
    entries: PropTypes.arrayOf(PropTypes.shape({
      currency: PropTypes.string,
      balanceUsd: PropTypes.number,
    })),
    fetchWallets: PropTypes.func.isRequired,
    dataReceived: PropTypes.bool.isRequired,
    pageLoading: PropTypes.bool.isRequired,
    refresh: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
  }

  static defaultProps = {
    entries: [],
    currentTime: null,
  }

  constructor(props) {
    super(props)
    const { currentTime } = props

    this.state = {
      timestamp: currentTime ? new Date(currentTime) : null,
    }
  }

  componentDidMount() {
    const { dataReceived, pageLoading, fetchWallets } = this.props
    if (!dataReceived && !pageLoading) {
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

  handleQuery = () => {
    const { fetchWallets } = this.props
    const { timestamp } = this.state
    const time = timestamp ? timestamp.getTime() : null
    fetchWallets(time)
  }

  render() {
    const {
      currentTime,
      entries,
      dataReceived,
      pageLoading,
      refresh,
      t,
    } = this.props
    const { timestamp } = this.state
    const hasNewTime = timestamp ? currentTime !== timestamp.getTime() : !!currentTime !== !!timestamp

    const filteredData = entries.filter(entry => entry.balanceUsd)

    const { tableData, chartData } = this.parseData(filteredData)
    const numRows = tableData.length
    const tableColumns = getColumns({ data: tableData })

    let showContent
    if (!dataReceived && pageLoading) {
      showContent = <Loading />
    } else if (!entries.length) {
      showContent = <NoData />
    } else {
      showContent = (
        <div className='concentration-risk-data'>
          <DataTable
            numRows={numRows}
            tableColumns={tableColumns}
          />
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
          <SectionHeaderRow>
            <SectionHeaderItem>
              <SectionHeaderItemLabel>
                {t('query.endTime')}
              </SectionHeaderItemLabel>
              <DateInput
                defaultValue={timestamp}
                onChange={this.handleDateChange}
              />
            </SectionHeaderItem>
            <QueryButton
              disabled={!hasNewTime}
              onClick={this.handleQuery}
            />
            <RefreshButton onClick={refresh} />
          </SectionHeaderRow>
        </SectionHeader>
        {showContent}
      </Card>
    )
  }
}

export default withTranslation('translations')(ConcentrationRisk)
