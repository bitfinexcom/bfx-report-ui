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

import ExportButton from 'ui/ExportButton'
import Loading from 'ui/Loading'
import NoData from 'ui/NoData'
import RefreshButton from 'ui/RefreshButton'
import DataTable from 'ui/DataTable'
import queryConstants from 'state/query/constants'
import { DEFAULT_DATETIME_FORMAT, momentFormatter } from 'state/utils'
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
    const { loading, fetchWallets } = this.props
    if (loading) {
      fetchWallets()
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
      handleClickExport,
      loading,
      refresh,
      t,
      timezone,
    } = this.props
    const { timestamp } = this.state
    const exchangeData = entries.filter(entry => entry.type === WALLET_EXCHANGE)
    const marginData = entries.filter(entry => entry.type === WALLET_MARGIN)
    const fundingData = entries.filter(entry => entry.type === WALLET_FUNDING)
    const exchangeColums = getColumns({ filteredData: exchangeData, t })
    const marginColums = getColumns({ filteredData: marginData, t })
    const fundingColums = getColumns({ filteredData: fundingData, t })
    const exchangeRows = exchangeData.length
    const marginRows = marginData.length
    const fundingRows = fundingData.length
    const hasNewTime = timestamp ? currentTime !== timestamp.getTime() : !!currentTime !== !!timestamp
    const timePrecision = platform.showSyncMode ? TimePrecision.SECOND : undefined
    const { formatDate, parseDate } = momentFormatter(DEFAULT_DATETIME_FORMAT, timezone)

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
          {t('wallets.query.title')}
        </Button>
      </Fragment>
    )
    let showContent
    if (loading) {
      showContent = (
        <Loading title='wallets.title' />
      )
    } else if (exchangeRows === 0 && marginRows === 0 && fundingRows === 0) {
      showContent = (
        <Fragment>
          <h4>
            {t('wallets.title')}
            {' '}
            {renderTimeSelection}
            {' '}
            <RefreshButton handleClickRefresh={refresh} />
          </h4>
          <NoData descId='wallets.nodata' />
        </Fragment>
      )
    } else {
      showContent = (
        <Fragment>
          <h4>
            {t('wallets.title')}
            {' '}
            {renderTimeSelection}
            {' '}
            <ExportButton handleClickExport={handleClickExport} timestamp={timestamp} />
            {' '}
            <RefreshButton handleClickRefresh={refresh} />
          </h4>
          <h4>
            {t('wallets.header.exchange')}
          </h4>
          <DataTable
            numRows={exchangeRows}
            tableColums={exchangeColums}
          />
          <h4>
            {t('wallets.header.margin')}
          </h4>
          <DataTable
            numRows={marginRows}
            tableColums={marginColums}
          />
          <h4>
            {t('wallets.header.funding')}
          </h4>
          <DataTable
            numRows={fundingRows}
            tableColums={fundingColums}
          />
        </Fragment>
      )
    }

    return (
      <Card elevation={Elevation.ZERO} className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
        {showContent}
      </Card>
    )
  }
}

Wallets.propTypes = propTypes
Wallets.defaultProps = defaultProps

export default withTranslation('translations')(Wallets)
