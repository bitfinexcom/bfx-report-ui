import React, { memo } from 'react'
import PropTypes from 'prop-types'

import DateInput from 'ui/DateInput'
import { isValidTimeStamp } from 'state/query/utils'
import gotToRangeTypes from 'state/goToRange/constants'

import RangeTypeSelect from './RangeTypeSelect'

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

  const isCustomRangeSelected = range === gotToRangeTypes.CUSTOM

  return (
    <div className='go-to-range-row'>
      <RangeTypeSelect
        onChange={onTimeRangeUpdate}
        range={range}
      />
      <div className='go-to-range'>
        <div className='go-to-range-item'>
          <div className='go-to-range-item--title'>
            {isCustomRangeSelected
              ? t('timeframe.from')
              : t('timeframe.select-date')
             }
          </div>
          <DateInput
            value={start}
            timezone={timezone}
            onChange={(date) => onDateChange('start', date)}
          />
        </div>
        {isCustomRangeSelected && (
          <div className='go-to-range-item'>
            <div className='go-to-range-item--title'>
              {t('timeframe.to')}
            </div>
            <DateInput
              value={end}
              timezone={timezone}
              onChange={(date) => onDateChange('end', date)}
            />
          </div>
        )}
      </div>
    </div>
  )
}

GoToRange.propTypes = {
  end: PropTypes.number.isRequired,
  start: PropTypes.number.isRequired,
  range: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
  timezone: PropTypes.string.isRequired,
  onTimeFrameUpdate: PropTypes.func.isRequired,
}

export default memo(GoToRange)
