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

import DateInput from 'ui/DateInput'
import Loading from 'ui/Loading'
import NoData from 'ui/NoData'
import DataTable from 'ui/DataTable'
import SectionHeader from 'ui/SectionHeader'
import queryConstants from 'state/query/constants'
import { isValidTimeStamp } from 'state/query/utils'
import { platform } from 'var/config'

import getColumns from './Wallets.columns'
import { propTypes, defaultProps } from './Wallets.props'

const {
  WALLET_EXCHANGE,
  WALLET_MARGIN,
  WALLET_FUNDING,
} = queryConstants

class Wallets extends PureComponent {
  constructor(props) {
    super(props)
    const { currentTime } = props

    this.state = {
      timestamp: currentTime ? new Date(currentTime) : null,
    }
  }

  componentDidMount() {
    const { dataReceived, pageLoading, fetchData } = this.props
    if (!dataReceived && !pageLoading) {
      fetchData()
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
    const { fetchData } = this.props
    const { timestamp } = this.state
    const time = timestamp ? timestamp.getTime() : null
    fetchData(time)
  }

  render() {
    const {
      currentTime,
      entries,
      dataReceived,
      pageLoading,
      t,
    } = this.props
    const { timestamp } = this.state
    const exchangeData = entries.filter(entry => entry.type === WALLET_EXCHANGE)
    const marginData = entries.filter(entry => entry.type === WALLET_MARGIN)
    const fundingData = entries.filter(entry => entry.type === WALLET_FUNDING)
    const exchangeColumns = getColumns({ filteredData: exchangeData, t })
    const marginColumns = getColumns({ filteredData: marginData, t })
    const fundingColumns = getColumns({ filteredData: fundingData, t })
    const exchangeRows = exchangeData.length
    const marginRows = marginData.length
    const fundingRows = fundingData.length
    const hasNewTime = timestamp ? currentTime !== timestamp.getTime() : !!currentTime !== !!timestamp

    const renderTimeSelection = (
      <Fragment>
        <Tooltip
          content={(
            <span>
              {t('wallets.query.tooltip')}
            </span>
          )}
          position={Position.TOP}
          usePortal
        >
          <DateInput onChange={this.handleDateChange} defaultValue={timestamp} />
        </Tooltip>
        <Button
          onClick={this.handleQuery}
          intent={hasNewTime ? Intent.PRIMARY : null}
          disabled={!hasNewTime}
        >
          {t('query.title')}
        </Button>
        {' '}
      </Fragment>
    )
    let showContent
    if (!dataReceived && pageLoading) {
      showContent = <Loading />
    } else if (exchangeRows === 0 && marginRows === 0 && fundingRows === 0) {
      showContent = (
        <Fragment>
          {platform.showFrameworkMode && renderTimeSelection}
          <NoData title='wallets.nodata' />
        </Fragment>
      )
    } else {
      showContent = (
        <Fragment>
          {platform.showFrameworkMode && renderTimeSelection}
          <div className='section-wallets-data'>
            <div className='section-wallets-data-item'>
              <div>{t('wallets.header.exchange')}</div>
              <DataTable
                numRows={exchangeRows}
                tableColumns={exchangeColumns}
              />
            </div>
            <div className='section-wallets-data-item'>
              <div>{t('wallets.header.margin')}</div>
              <DataTable
                numRows={marginRows}
                tableColumns={marginColumns}
              />
            </div>
            <div className='section-wallets-data-item'>
              <div>{t('wallets.header.funding')}</div>
              <DataTable
                numRows={fundingRows}
                tableColumns={fundingColumns}
              />
            </div>
          </div>
        </Fragment>
      )
    }

    return (
      <Card elevation={Elevation.ZERO} className='col-lg-12 col-md-12 col-sm-12 col-xs-12 section-wallets'>
        <SectionHeader
          filter={false}
          timeframe={false}
          title='wallets.title'
        />
        {showContent}
      </Card>
    )
  }
}

Wallets.propTypes = propTypes
Wallets.defaultProps = defaultProps

export default withTranslation('translations')(Wallets)
