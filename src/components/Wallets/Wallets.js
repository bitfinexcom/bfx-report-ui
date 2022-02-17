import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'
import { Card, Elevation } from '@blueprintjs/core'

import NoData from 'ui/NoData'
import Loading from 'ui/Loading'
import DateInput from 'ui/DateInput'
import {
  SectionHeader,
  SectionHeaderRow,
  SectionHeaderItem,
  SectionHeaderTitle,
  SectionHeaderItemLabel,
} from 'ui/SectionHeader'
import QueryButton from 'ui/QueryButton'
import RefreshButton from 'ui/RefreshButton'
import { isValidTimeStamp } from 'state/query/utils'
import config from 'config'

import WalletsData from './Wallets.data'

class Wallets extends PureComponent {
  static propTypes = {
    currentTime: PropTypes.number,
    entries: PropTypes.arrayOf(PropTypes.shape({
      currency: PropTypes.string,
      balance: PropTypes.number,
      unsettledInterest: PropTypes.number,
      balanceAvailable: PropTypes.number,
    })),
    fetchData: PropTypes.func.isRequired,
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

  handleQuery = () => {
    const { fetchData } = this.props
    const { timestamp } = this.state
    const time = timestamp ? timestamp.getTime() : null
    fetchData(time)
  }

  render() {
    const {
      t,
      refresh,
      entries,
      currentTime,
      pageLoading,
      dataReceived,
    } = this.props
    const { timestamp } = this.state
    const hasNewTime = timestamp ? currentTime !== timestamp.getTime() : !!currentTime !== !!timestamp

    let showContent
    if (!dataReceived && pageLoading) {
      showContent = <Loading />
    } else if (!entries.length) {
      showContent = <NoData title='wallets.nodata' refresh={refresh} />
    } else {
      showContent = <WalletsData entries={entries} />
    }

    return (
      <Card
        elevation={Elevation.ZERO}
        className='col-lg-12 col-md-12 col-sm-12 col-xs-12 section-wallets'
      >
        <SectionHeader>
          <SectionHeaderTitle>
            {t('wallets.title')}
          </SectionHeaderTitle>
          {config.showFrameworkMode && (
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
          )}
        </SectionHeader>
        {showContent}
      </Card>
    )
  }
}

export default withTranslation('translations')(Wallets)
