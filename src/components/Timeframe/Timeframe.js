import React, { PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import queryString from 'query-string'
import { MenuItem, PopoverInteractionKind } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'

import constants from 'state/query/constants'
import baseType from 'state/base/constants'
import { formatDate } from 'state/utils'

import { propTypes, defaultProps } from './Timeframe.props'

const TIME_FRAMES_POPOVER_PROPS = {
  interactionKind: PopoverInteractionKind.CLICK,
  className: 'bitfinex-timeframe',
}

class Timeframe extends PureComponent {
  constructor(props) {
    super(props)
    this.handleClick24H = this.handleClick.bind(this, constants.TIME_RANGE_LAST_24HOURS)
    this.handleClickLast2Weeks = this.handleClick.bind(this, constants.TIME_RANGE_LAST_2WEEKS)
    this.handleClickPastMonth = this.handleClick.bind(this, constants.TIME_RANGE_PAST_MONTH)
    this.handleClickPast3Month = this.handleClick.bind(this, constants.TIME_RANGE_PAST_3MONTH)
  }

  componentDidUpdate() {
    const {
      timeRange, start, end, location, history,
    } = this.props
    // only update query param when its set in custom time range
    if (timeRange === constants.TIME_RANGE_CUSTOM) {
      const parsed = queryString.parse(location.search)
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

  resetRangeQuery = () => {
    const { location, history } = this.props
    const parsed = queryString.parse(location.search)
    const { range, ...params } = parsed
    history.push(`${location.pathname}?${queryString.stringify(params, { encode: false })}`)
  }

  handleClick(rangeType, e) {
    e.preventDefault()
    this.resetRangeQuery()
    // eslint-disable-next-line react/destructuring-assignment
    this.props.setTimeRange(rangeType)
  }

  render() {
    const {
      end,
      handleClickCustom,
      menuMode,
      start,
      t,
      timeRange,
      timezone,
    } = this.props
    const timeSpan = `${formatDate(start, timezone)} — ${formatDate(end, timezone)}`

    return (
      <MenuItem
        icon={IconNames.CALENDAR}
        text={menuMode === baseType.MENU_MODE_ICON ? '' : timeSpan}
        title={menuMode === baseType.MENU_MODE_ICON ? timeSpan : undefined}
        className='bitfinex-dropdown'
        popoverProps={TIME_FRAMES_POPOVER_PROPS}
      >
        <MenuItem
          text={t('timeframe.24h')}
          onClick={this.handleClick24H}
          active={timeRange === constants.TIME_RANGE_LAST_24HOURS}
        />
        <MenuItem
          text={t('timeframe.2w')}
          onClick={this.handleClickLast2Weeks}
          active={timeRange === constants.TIME_RANGE_LAST_2WEEKS}
        />
        <MenuItem
          text={t('timeframe.past_month')}
          onClick={this.handleClickPastMonth}
          active={timeRange === constants.TIME_RANGE_PAST_MONTH}
        />
        <MenuItem
          text={t('timeframe.past_3m')}
          onClick={this.handleClickPast3Month}
          active={timeRange === constants.TIME_RANGE_PAST_3MONTH}
        />
        <MenuItem
          text={t('timeframe.custom_time')}
          onClick={handleClickCustom}
          active={timeRange === constants.TIME_RANGE_CUSTOM}
        />
      </MenuItem>
    )
  }
}

Timeframe.propTypes = propTypes
Timeframe.defaultProps = defaultProps

export default withTranslation('translations')(Timeframe)
