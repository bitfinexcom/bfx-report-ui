import React, { memo } from 'react'

import DateInput from 'ui/DateInput'
import { isValidTimeStamp } from 'state/query/utils'
import gotToRangeTypes from 'state/goToRange/constants'

import RangeTypeSelect from './RangeTypeSelect'
import { propTypes } from './GoToRange.props'

const GoToRange = ({
  end,
  onTimeFrameUpdate,
  start,
  t,
  timezone,
  range,
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
    <div className='go-to-range'>
      <RangeTypeSelect
        onChange={onTimeRangeUpdate}
        range={range}
      />
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
        {range === gotToRangeTypes.CUSTOM && (
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
        )}
      </div>
    </div>
  )
}

GoToRange.propTypes = propTypes

export default memo(GoToRange)
