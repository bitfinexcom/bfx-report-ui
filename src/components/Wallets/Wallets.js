import React, { PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import { Card, Elevation } from '@blueprintjs/core'

import config from 'config'
import DateInput from 'ui/DateInput'
import BalancePrecisionSelector from 'ui/BalancePrecisionSelector'
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

import WalletsData from './Wallets.data'
import { propTypes, defaultProps } from './Wallets.props'

const isFrameworkMode = config.showFrameworkMode

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
      fetchData,
      pageLoading,
      dataReceived,
      fetchSnapshots,
      isSyncRequired,
    } = this.props

    if (!isSyncRequired && !dataReceived && !pageLoading) {
      fetchData()
      if (isFrameworkMode)fetchSnapshots()
    }
  }

  componentDidUpdate(prevProps) {
    const { isSyncRequired: prevIsSyncRequired } = prevProps
    const { fetchData, fetchSnapshots, isSyncRequired } = this.props

    if (isSyncRequired !== prevIsSyncRequired) {
      fetchData()
      if (isFrameworkMode)fetchSnapshots()
    }
  }

  handleDateChange = (time) => {
    const { setTimestamp } = this.props
    const end = time && time.getTime()
    if (isValidTimeStamp(end) || time === null) {
      this.setState({ timestamp: time })
      setTimestamp(time.getTime())
    }
  }

  handleQuery = () => {
    const { fetchData, fetchSnapshots } = this.props
    const { timestamp } = this.state
    const time = timestamp ? timestamp.getTime() : null
    fetchData(time)
    if (isFrameworkMode) fetchSnapshots(time)
  }

  render() {
    const {
      t,
      entries,
      refresh,
      pageLoading,
      currentTime,
      exactBalance,
      dataReceived,
      setExactBalance,
      snapshotLoading,
      snapshotReceived,
      walletsSnapshotEntries,
    } = this.props
    const { timestamp } = this.state
    const hasNewTime = timestamp ? currentTime !== timestamp.getTime() : !!currentTime !== !!timestamp
    const walletsData = (isFrameworkMode && exactBalance) ? walletsSnapshotEntries : entries
    const isLoading = (!dataReceived && pageLoading)
      || (exactBalance && !snapshotReceived && snapshotLoading)

    return (
      <Card
        elevation={Elevation.ZERO}
        className='col-lg-12 col-md-12 col-sm-12 col-xs-12 section-wallets'
      >
        <SectionHeader>
          <SectionHeaderTitle>
            {t('navItems.myHistory.walletsTabs.balances')}
          </SectionHeaderTitle>
          {isFrameworkMode && (
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
        <WalletsData
          isLoading={isLoading}
          entries={walletsData}
        />
      </Card>
    )
  }
}

Wallets.propTypes = propTypes
Wallets.defaultProps = defaultProps

export default withTranslation('translations')(Wallets)
