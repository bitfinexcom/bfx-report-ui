import React, { memo, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Classes,
  Dialog,
  Intent,
} from '@blueprintjs/core'

import Icon from 'icons'
import TimeFrame from 'ui/TimeFrame'
import timeRangeTypes from 'state/timeRange/constants'

const TimeFrameDialog = ({
  t,
  isOpen,
  timeRange,
  setTimeRange,
  toggleDialog,
  end: endTime,
  start: startTime,
}) => {
  const [selectedTimeFrame, setSelectedTimeFrame] = useState({
    start: startTime,
    end: endTime,
    range: timeRange.range || timeRangeTypes.CUSTOM,
  })

  useEffect(() => {
    const { range } = timeRange
    setSelectedTimeFrame({
      ...selectedTimeFrame,
      range,
    })
  }, [timeRange])

  const onTimeFrameUpdate = (params) => {
    setSelectedTimeFrame({
      ...selectedTimeFrame,
      ...params,
    })
  }

  const { start, end, range } = selectedTimeFrame

  const onConfirm = () => {
    setTimeRange({ start, end, range })
    toggleDialog()
  }

  if (!isOpen) {
    return null
  }

  return (
    <Dialog
      icon={<Icon.CALENDAR />}
      className='time-frame-dialog'
      isCloseButtonShown={false}
      isOpen={isOpen}
      onClose={toggleDialog}
      title={t('timeframe.custom.title')}
    >
      <div className={Classes.DIALOG_BODY}>
        <TimeFrame
          start={start}
          end={end}
          range={range}
          onTimeFrameUpdate={onTimeFrameUpdate}
        />
      </div>
      <div className={Classes.DIALOG_FOOTER}>
        <div className='time-frame-dialog--buttons-row'>
          <Button
            className='time-frame-dialog--button'
            intent={Intent.NONE}
            onClick={toggleDialog}
          >
            {t('timeframe.custom.cancel')}
          </Button>
          <Button
            className='time-frame-dialog--button'
            intent={Intent.PRIMARY}
            onClick={onConfirm}
          >
            {t('timeframe.custom.confirm')}
          </Button>
        </div>
      </div>
    </Dialog>
  )
}

TimeFrameDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  end: PropTypes.number,
  start: PropTypes.number,
  t: PropTypes.func.isRequired,
  timeRange: PropTypes.shape({
    end: PropTypes.number,
    range: PropTypes.string,
    start: PropTypes.number,
  }).isRequired,
  setTimeRange: PropTypes.func.isRequired,
  toggleDialog: PropTypes.func.isRequired,
}

TimeFrameDialog.defaultProps = {
  start: 0,
  end: 0,
}

export default memo(TimeFrameDialog)
