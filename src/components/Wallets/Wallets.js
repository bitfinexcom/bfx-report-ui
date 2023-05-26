import React, { PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import { Card, Elevation } from '@blueprintjs/core'
import _isEmpty from 'lodash/isEmpty'

import config from 'config'
import NoData from 'ui/NoData'
import Loading from 'ui/Loading'
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
import queryConstants from 'state/query/constants'

import WalletsData from './Wallets.data'
import { propTypes, defaultProps } from './Wallets.props'

const isFrameworkMode = config.showFrameworkMode
const TYPE = queryConstants.MENU_WALLETS

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
    } = this.props

    if (!dataReceived && !pageLoading) {
      fetchData()
      if (isFrameworkMode)fetchSnapshots()
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
    const isNoData = _isEmpty(entries) || (exactBalance && _isEmpty(walletsSnapshotEntries))

    let showContent
    if (isLoading) {
      showContent = <Loading />
    } else if (isNoData) {
      showContent = <NoData title='wallets.nodata' refresh={refresh} />
    } else {
      showContent = <WalletsData entries={walletsData} />
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
        {showContent}
      </Card>
    )
  }
}

Wallets.propTypes = propTypes
Wallets.defaultProps = defaultProps

export default withTranslation('translations')(Wallets)
