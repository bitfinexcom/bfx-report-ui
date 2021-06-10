import React, { PureComponent } from 'react'
import { withTranslation } from 'react-i18next'

import DateInput from 'ui/DateInput'
import { getTimeFrameFromData } from 'state/timeRange/selectors'
import { isValidTimeStamp } from 'state/query/utils'
import timeRangeTypes from 'state/timeRange/constants'

import TimeRangeSelect from './TimeRangeSelect'
import { propTypes } from './TimeFrame.props'

class TimeFrame extends PureComponent {
  onDateChange = (type, date) => {
    const timestamp = date && date.getTime()
    if (isValidTimeStamp(timestamp) || timestamp === null) {
      this.onTimeFrameUpdate({ [type]: timestamp })
    }
  }

  onTimeFrameUpdate = (params) => {
    const { setTimeRange, timeRange } = this.props

    const { start, end } = getTimeFrameFromData(timeRange)

    setTimeRange({
      start: params.start || start,
      end: params.end || end,
      range: params.range || timeRangeTypes.CUSTOM,
    })
  }

  onTimeRangeUpdate = (range) => {
    this.onTimeFrameUpdate({ range })
  }

  render() {
    const {
      t,
      timeRange,
      timezone,
    } = this.props
    const { range } = timeRange

    const { end, start } = getTimeFrameFromData(timeRange)

    return (
      <div className='time-frame'>
        <TimeRangeSelect
          onChange={this.onTimeRangeUpdate}
          range={range}
        />
        {range === timeRangeTypes.CUSTOM && (
          <div className='time-frame-range'>
            <div className='time-frame-item'>
              <div className='time-frame-item--title'>
                {t('timeframe.start-date-placeholder')}
              </div>
              <DateInput
                onChange={(date) => this.onDateChange('start', date)}
                timezone={timezone}
                value={start}
              />
            </div>
            <div className='time-frame-item'>
              <div className='time-frame-item--title'>
                {t('timeframe.end-date-placeholder')}
              </div>
              <DateInput
                onChange={(date) => this.onDateChange('end', date)}
                timezone={timezone}
                value={end}
              />
            </div>
          </div>
        )}
      </div>
    )
  }
}

TimeFrame.propTypes = propTypes

export default withTranslation('translations')(TimeFrame)
