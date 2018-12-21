import React, { Fragment, PureComponent } from 'react'
import { injectIntl } from 'react-intl'
import {
  Card,
  Elevation,
} from '@blueprintjs/core'
import { DateInput } from '@blueprintjs/datetime'

import ExportButton from 'ui/ExportButton'
import Loading from 'ui/Loading'
import NoData from 'ui/NoData'
import RefreshButton from 'ui/RefreshButton'
import DataTable from 'ui/DataTable'
import queryConstants from 'state/query/constants'
import { checkFetch, DATE_FORMAT } from 'state/utils'
import { isValidTimeStamp } from 'state/query/utils'

import getColumns from './Wallets.columns'
import { propTypes, defaultProps } from './Wallets.props'

const {
  MENU_WALLETS,
  WALLET_EXCHANGE,
  WALLET_MARGIN,
  WALLET_FUNDING,
} = queryConstants
const TYPE = MENU_WALLETS

class Wallets extends PureComponent {
  constructor(props) {
    super(props)
    this.handleDateChange = this.handleDateChange.bind(this)
  }

  state = {
    timestamp: new Date(),
  }

  componentDidMount() {
    const { loading, fetchWallets } = this.props
    const { timestamp } = this.state
    if (loading) {
      fetchWallets(timestamp.getTime())
    }
  }

  componentDidUpdate(prevProps) {
    checkFetch(prevProps, this.props, TYPE)
  }

  handleDateChange(time) {
    const { debouncedFetchWallets } = this.props
    const end = time && time.getTime()
    if (isValidTimeStamp(end)) {
      this.setState({ timestamp: time })
      // onChange will trigger everytime when value is changed,
      // but we only need fetch once user is settled
      debouncedFetchWallets(end)
    }
  }

  render() {
    const {
      entries,
      handleClickExport,
      intl,
      loading,
      refresh,
    } = this.props
    const { timestamp } = this.state
    const exchangeData = entries.filter(entry => entry.type === WALLET_EXCHANGE)
    const marginData = entries.filter(entry => entry.type === WALLET_MARGIN)
    const fundingData = entries.filter(entry => entry.type === WALLET_FUNDING)
    const exchangeColums = getColumns({ filteredData: exchangeData })
    const marginColums = getColumns({ filteredData: marginData })
    const fundingColums = getColumns({ filteredData: fundingData })
    const exchangeRows = exchangeData.length
    const marginRows = marginData.length
    const fundingRows = fundingData.length

    const renderTimeSelection = (
      <DateInput
        formatDate={DATE_FORMAT.formatDate}
        parseDate={DATE_FORMAT.parseDate}
        onChange={this.handleDateChange}
        value={timestamp}
        timePrecision='second'
        todayButtonText='Now'
        showActionsBar
      />
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
            {intl.formatMessage({ id: 'wallets.title' })}
            &nbsp;
            {renderTimeSelection}
            &nbsp;
            <RefreshButton handleClickRefresh={refresh} />
          </h4>
          <NoData descId='wallets.nodata' />
        </Fragment>
      )
    } else {
      showContent = (
        <Fragment>
          <h4>
            {intl.formatMessage({ id: 'wallets.title' })}
            &nbsp;
            {renderTimeSelection}
            &nbsp;
            <ExportButton handleClickExport={handleClickExport} timestamp={timestamp} />
            &nbsp;
            <RefreshButton handleClickRefresh={refresh} />
          </h4>
          <h4>
            {intl.formatMessage({ id: 'wallets.title.exchange' })}
          </h4>
          <DataTable
            numRows={exchangeRows}
            tableColums={exchangeColums}
          />
          <h4>
            {intl.formatMessage({ id: 'wallets.title.margin' })}
          </h4>
          <DataTable
            numRows={marginRows}
            tableColums={marginColums}
          />
          <h4>
            {intl.formatMessage({ id: 'wallets.title.funding' })}
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

export default injectIntl(Wallets)
