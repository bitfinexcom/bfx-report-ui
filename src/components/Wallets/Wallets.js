import React, { PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import { Card, Elevation } from '@blueprintjs/core'

import DateInput from 'ui/DateInput'
import Loading from 'ui/Loading'
import NoData from 'ui/NoData'
import BalancePrecisionSelector from 'ui/BalancePrecisionSelector'
import {
  SectionHeader,
  SectionHeaderItem,
  SectionHeaderItemLabel,
  SectionHeaderRow,
  SectionHeaderTitle,
} from 'ui/SectionHeader'
import QueryButton from 'ui/QueryButton'
import RefreshButton from 'ui/RefreshButton'
import { isValidTimeStamp } from 'state/query/utils'
import config from 'config'

import WalletsData from './Wallets.data'
import { propTypes, defaultProps } from './Wallets.props'

class Wallets extends PureComponent {
  constructor(props) {
    super(props)
    const { currentTime } = props

    this.state = {
      timestamp: currentTime ? new Date(currentTime) : null,
    }
  }

  componentDidMount() {
    const {
      dataReceived, pageLoading, fetchData, fetchSnapshots,
    } = this.props

    if (!dataReceived && !pageLoading) {
      fetchSnapshots()
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
    const { fetchData, fetchSnapshots } = this.props
    const { timestamp } = this.state
    const time = timestamp ? timestamp.getTime() : null
    fetchSnapshots(time)
    fetchData(time)
  }

  render() {
    const {
      currentTime,
      entries,
      dataReceived,
      pageLoading,
      refresh,
      exactBalance,
      setExactBalance,
      t,
      walletsSnapshotEntries,
    } = this.props
    const { timestamp } = this.state
    const hasNewTime = timestamp ? currentTime !== timestamp.getTime() : !!currentTime !== !!timestamp

    let showContent
    if (!dataReceived && pageLoading) {
      showContent = <Loading />
    } else if (!entries.length) {
      showContent = <NoData title='wallets.nodata' refresh={refresh} />
    } else {
      showContent = <WalletsData entries={exactBalance ? walletsSnapshotEntries : entries} />
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
              <SectionHeaderItem>
                <SectionHeaderItemLabel>
                  {t('selector.balance-precision.title')}
                </SectionHeaderItemLabel>
                <BalancePrecisionSelector
                  value={exactBalance}
                  onChange={setExactBalance}
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

Wallets.propTypes = propTypes
Wallets.defaultProps = defaultProps

export default withTranslation('translations')(Wallets)
