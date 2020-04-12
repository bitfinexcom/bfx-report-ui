import React, { PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import {
  Button,
  Card,
  Elevation,
  Intent,
} from '@blueprintjs/core'
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
    const tableColumns = getColumns({
      data: tableData,
      t,
    })

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
      <Card elevation={Elevation.ZERO} className='col-lg-12 col-md-12 col-sm-12 col-xs-12 concentration-risk'>
        <SectionHeader>
          <SectionHeaderTitle>{t('concentrationrisk.title')}</SectionHeaderTitle>
          <SectionHeaderRow>
            <SectionHeaderItem>
              <SectionHeaderItemLabel>
                {t('query.endTime')}
              </SectionHeaderItemLabel>
              <DateInput
                onChange={this.handleDateChange}
                defaultValue={timestamp}
              />
            </SectionHeaderItem>

            <Button
              className='button--large'
              onClick={this.handleQuery}
              intent={Intent.PRIMARY}
              disabled={!hasNewTime}
            >
              {t('query.title')}
            </Button>
            <RefreshButton onClick={refresh} />
          </SectionHeaderRow>
        </SectionHeader>
        {showContent}
      </Card>
    )
  }
}

ConcentrationRisk.propTypes = propTypes
ConcentrationRisk.defaultProps = defaultProps

export default withTranslation('translations')(ConcentrationRisk)
