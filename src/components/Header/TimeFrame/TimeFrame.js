import React, { PureComponent } from 'react'
import { Popover, Position } from '@blueprintjs/core'

import DateRangePicker from 'ui/DateRangePicker'
import Icon from 'icons'
import { formatDate } from 'state/utils'

import { propTypes, defaultProps } from './TimeFrame.props'

class TimeFrame extends PureComponent {
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
