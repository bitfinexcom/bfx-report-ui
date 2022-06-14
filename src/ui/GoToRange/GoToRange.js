import React, { memo } from 'react'

import DateInput from 'ui/DateInput'
import { isValidTimeStamp } from 'state/query/utils'

import { propTypes } from './GoToRange.props'

const GoToRange = ({
  end,
  onTimeFrameUpdate,
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

  return (
    <div className='go-to-range'>
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
    </div>
  )
}

GoToRange.propTypes = propTypes

export default memo(GoToRange)
