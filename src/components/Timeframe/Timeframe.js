import React, { PureComponent } from 'react'
import { injectIntl } from 'react-intl'
import { MenuItem } from '@blueprintjs/core'
import queryString from 'query-string'

import constants from 'state/query/constants'
import baseType from 'state/base/constants'
import { formatDate } from 'state/utils'

import { propTypes, defaultProps } from './Timeframe.props'

class Timeframe extends PureComponent {
  constructor(props) {
    super(props)
    this.handleClick24H = this.handleClick.bind(this, constants.TIME_RANGE_LAST_24HOURS)
    this.handleClickYesterday = this.handleClick.bind(this, constants.TIME_RANGE_YESTERDAY)
    this.handleClickLast2Weeks = this.handleClick.bind(this, constants.TIME_RANGE_LAST_2WEEKS)
    this.handleClickMonthToDate = this.handleClick.bind(this, constants.TIME_RANGE_MONTH_TO_DATE)
    this.handleClickPastMonth = this.handleClick.bind(this, constants.TIME_RANGE_PAST_MONTH)
    this.handleClickPast3Month = this.handleClick.bind(this, constants.TIME_RANGE_PAST_3MONTH)
  }

  componentDidUpdate() {
    const {
      timeRange, start, end, location, history,
    } = this.props
    // only update query param when its set in custom time range
    if (timeRange === constants.TIME_RANGE_CUSTOM) {
      const parsed = queryString.parse(window.location.search)
      const { range } = parsed
      const [startStr, endStr] = range ? range.split('-') : [undefined, undefined]
      if (`${start}` !== startStr || `${end}` !== endStr) {
        const params = Object.assign(
          parsed,
          { range: `${start}-${end}` },
        )
        history.push(`${location.pathname}?${queryString.stringify(params, { encode: false })}`)
      }
    }
  }

  handleClick(rangeType, e) {
    e.preventDefault()
    // eslint-disable-next-line react/destructuring-assignment
    this.props.setTimeRange(rangeType)
  }

  render() {
    const {
      end,
      handleClickCustom,
      intl,
      menuMode,
      start,
      timeRange,
    } = this.props
    return menuMode === baseType.MENU_MODE_ICON ? (
      <MenuItem
        icon='calendar'
        text=''
        title={`${formatDate(start)} — ${formatDate(end)}`}
        className='bitfinex-dropdown'
      >
        <MenuItem
          text={intl.formatMessage({ id: 'timeframe.24h' })}
          onClick={this.handleClick24H}
          active={timeRange === constants.TIME_RANGE_LAST_24HOURS}
        />
        <MenuItem
          text={intl.formatMessage({ id: 'timeframe.yesterday' })}
          onClick={this.handleClickYesterday}
          active={timeRange === constants.TIME_RANGE_YESTERDAY}
        />
        <MenuItem
          text={intl.formatMessage({ id: 'timeframe.2w' })}
          onClick={this.handleClickLast2Weeks}
          active={timeRange === constants.TIME_RANGE_LAST_2WEEKS}
        />
        <MenuItem
          text={intl.formatMessage({ id: 'timeframe.month_to_date' })}
          onClick={this.handleClickMonthToDate}
          active={timeRange === constants.TIME_RANGE_MONTH_TO_DATE}
        />
        <MenuItem
          text={intl.formatMessage({ id: 'timeframe.past_month' })}
          onClick={this.handleClickPastMonth}
          active={timeRange === constants.TIME_RANGE_PAST_MONTH}
        />
        <MenuItem
          text={intl.formatMessage({ id: 'timeframe.past_3m' })}
          onClick={this.handleClickPast3Month}
          active={timeRange === constants.TIME_RANGE_PAST_3MONTH}
        />
        <MenuItem
          text={intl.formatMessage({ id: 'timeframe.custom' })}
          onClick={handleClickCustom}
          active={timeRange === constants.TIME_RANGE_CUSTOM}
        />
      </MenuItem>
    ) : (
      <MenuItem
        icon='calendar'
        text={`${formatDate(start)} — ${formatDate(end)}`}
        className='bitfinex-dropdown'
      >
        <MenuItem
          text={intl.formatMessage({ id: 'timeframe.24h' })}
          onClick={this.handleClick24H}
          active={timeRange === constants.TIME_RANGE_LAST_24HOURS}
        />
        <MenuItem
          text={intl.formatMessage({ id: 'timeframe.yesterday' })}
          onClick={this.handleClickYesterday}
          active={timeRange === constants.TIME_RANGE_YESTERDAY}
        />
        <MenuItem
          text={intl.formatMessage({ id: 'timeframe.2w' })}
          onClick={this.handleClickLast2Weeks}
          active={timeRange === constants.TIME_RANGE_LAST_2WEEKS}
        />
        <MenuItem
          text={intl.formatMessage({ id: 'timeframe.month_to_date' })}
          onClick={this.handleClickMonthToDate}
          active={timeRange === constants.TIME_RANGE_MONTH_TO_DATE}
        />
        <MenuItem
          text={intl.formatMessage({ id: 'timeframe.past_month' })}
          onClick={this.handleClickPastMonth}
          active={timeRange === constants.TIME_RANGE_PAST_MONTH}
        />
        <MenuItem
          text={intl.formatMessage({ id: 'timeframe.past_3m' })}
          onClick={this.handleClickPast3Month}
          active={timeRange === constants.TIME_RANGE_PAST_3MONTH}
        />
        <MenuItem
          text={intl.formatMessage({ id: 'timeframe.custom' })}
          onClick={handleClickCustom}
          active={timeRange === constants.TIME_RANGE_CUSTOM}
        />
      </MenuItem>
    )
  }
}

Timeframe.propTypes = propTypes
Timeframe.defaultProps = defaultProps

export default injectIntl(Timeframe)
