import React, { PureComponent } from 'react'
import { injectIntl } from 'react-intl'
import {
  Menu,
  MenuItem,
} from '@blueprintjs/core'
import constants from 'state/query/constants'
import { propTypes, defaultProps } from './QueryRangeMenu.props'

class QueryRangeMenu extends PureComponent {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(rangeType) {
    this.props.setTimeRange(rangeType)
  }

  render() {
    const { intl, timeRange } = this.props
    return (
      <Menu>
        <MenuItem text={intl.formatMessage({ id: 'timeframe.24h' })} onClick={() => this.handleClick(constants.TIME_RANGE_LAST_24HOURS)} active={timeRange === constants.TIME_RANGE_LAST_24HOURS} />
        <MenuItem text={intl.formatMessage({ id: 'timeframe.yesterday' })} onClick={() => this.handleClick(constants.TIME_RANGE_YESTERDAY)} active={timeRange === constants.TIME_RANGE_YESTERDAY} />
        <MenuItem text={intl.formatMessage({ id: 'timeframe.2w' })} onClick={() => this.handleClick(constants.TIME_RANGE_LAST_2WEEKS)} active={timeRange === constants.TIME_RANGE_LAST_2WEEKS} />
        <MenuItem text={intl.formatMessage({ id: 'timeframe.month_to_date' })} onClick={() => this.handleClick(constants.TIME_RANGE_MONTH_TO_DATE)} active={timeRange === constants.TIME_RANGE_MONTH_TO_DATE} />
        <MenuItem text={intl.formatMessage({ id: 'timeframe.past_month' })} onClick={() => this.handleClick(constants.TIME_RANGE_PAST_MONTH)} active={timeRange === constants.TIME_RANGE_PAST_MONTH} />
        <MenuItem text={intl.formatMessage({ id: 'timeframe.past_3m' })} onClick={() => this.handleClick(constants.TIME_RANGE_PAST_3MONTH)} active={timeRange === constants.TIME_RANGE_PAST_3MONTH} />
        <MenuItem text={intl.formatMessage({ id: 'timeframe.custom' })} onClick={() => this.handleClick(constants.TIME_RANGE_CUSTOM)} active={timeRange === constants.TIME_RANGE_CUSTOM} disabled />
      </Menu>
    )
  }
}

QueryRangeMenu.propTypes = propTypes
QueryRangeMenu.defaultProps = defaultProps

export default injectIntl(QueryRangeMenu)
