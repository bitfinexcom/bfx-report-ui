import React, { PureComponent } from 'react'
import queryString from 'query-string'
import { Popover, Position } from '@blueprintjs/core'

import DateRangePicker from 'ui/DateRangePicker'
import Icon from 'icons'
import constants from 'state/query/constants'
import { formatDate } from 'state/utils'

import { propTypes, defaultProps } from './TimeFrame.props'

class TimeFrame extends PureComponent {
  constructor() {
    super()
    this.handleClickLast2Weeks = this.handleClick.bind(this, constants.TIME_RANGE_LAST_2WEEKS)
    this.handleClickPastMonth = this.handleClick.bind(this, constants.TIME_RANGE_PAST_MONTH)
  }

  componentDidUpdate() {
    const {
      timeRange, start, end, history,
    } = this.props
    // only update query param when its set in custom time range
    if (timeRange === constants.TIME_RANGE_CUSTOM) {
      const { pathname, search } = window.location
      const parsed = queryString.parse(search)
      const { range } = parsed
      const [startStr, endStr] = range ? range.split('-') : [undefined, undefined]
      if (`${start}` !== startStr || `${end}` !== endStr) {
        const params = Object.assign(
          parsed,
          { range: `${start}-${end}` },
        )
        history.replace(`${pathname}?${queryString.stringify(params, { encode: false })}`)
      }
    }
  }

  resetRangeQuery = () => {
    const { location, history } = this.props
    const parsed = queryString.parse(location.search)
    const { range, ...params } = parsed
    history.push(`${location.pathname}?${queryString.stringify(params, { encode: false })}`)
  }

  handleClick(rangeType) {
    const { setTimeRange } = this.props
    this.resetRangeQuery()
    setTimeRange(rangeType)
  }

  render() {
    const {
      end,
      start,
      timezone,
    } = this.props

    const timeSpan = `${formatDate(start, timezone)} - ${formatDate(end, timezone)}`

    return (
      <div className='timeframe'>
        <Popover
          minimal
          position={Position.BOTTOM}
          content={(
            <div className='timeframe-content'>
              <DateRangePicker />
            </div>
          )}
          targetTagName='div'
          className='bitfinex-dropdown'
        >
          <div className='timeframe-wrapper'>
            <div className='timeframe-target'>
              <Icon.CALENDAR />
              <div className='timeframe-range'>
                {timeSpan}
              </div>
              <Icon.CHEVRON_DOWN />
              <Icon.CHEVRON_UP />
            </div>
          </div>
        </Popover>
      </div>
    )
  }
}

TimeFrame.propTypes = propTypes
TimeFrame.defaultProps = defaultProps

export default TimeFrame
