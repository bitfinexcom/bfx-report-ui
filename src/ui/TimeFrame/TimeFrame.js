import React, { memo } from 'react'

import DateInput from 'ui/DateInput'
import { isValidTimeStamp } from 'state/query/utils'
import timeRangeTypes from 'state/timeRange/constants'

import TimeRangeSelect from './TimeRangeSelect'
import { propTypes } from './TimeFrame.props'

const TimeFrame = ({
  end,
  onTimeFrameUpdate,
  range,
  start,
  t,
  timezone,
}) => {
  const onDateChange = (type, date) => {
    const timestamp = date && date.getTime()
    if (isValidTimeStamp(timestamp) || timestamp === null) {
      onTimeFrameUpdate({ [type]: timestamp })
    }
  }

  const onTimeRangeUpdate = (value) => {
    onTimeFrameUpdate({ range: value })
  }

  return (
    <div className='time-frame'>
      <TimeRangeSelect
        onChange={onTimeRangeUpdate}
        range={range}
      />
      {range === timeRangeTypes.CUSTOM && (
      <div className='time-frame-range'>
        <div className='time-frame-item'>
          <div className='time-frame-item--title'>
            {t('timeframe.start-date-placeholder')}
          </div>
          <DateInput
            onChange={(date) => onDateChange('start', date)}
            timezone={timezone}
            value={start}
          />
        </div>
        <div className='time-frame-item'>
          <div className='time-frame-item--title'>
            {t('timeframe.end-date-placeholder')}
          </div>
          <DateInput
            onChange={(date) => onDateChange('end', date)}
            timezone={timezone}
            value={end}
          />
        </div>
      </div>
      )}
    </div>
  )
}

TimeFrame.propTypes = propTypes

export default memo(TimeFrame)
