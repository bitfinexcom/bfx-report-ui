import React, { memo, useState, useEffect } from 'react'
import {
  Button,
  Classes,
  Dialog,
  Intent,
} from '@blueprintjs/core'

import Icon from 'icons'
import TimeFrame from 'ui/TimeFrame'
import timeRangeTypes from 'state/timeRange/constants'

import { propTypes, defaultProps } from './GoToRangeDialog.props'

const TimeFrameDialog = ({
  isOpen,
  end: endTime,
  start: startTime,
  setTimeRange,
  t,
  timeRange,
  toggleDialog,
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
      className='go-to-range-dialog'
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
        <div className='go-to-range-dialog--buttons-row'>
          <Button
            className='go-to-range-dialog--button'
            intent={Intent.NONE}
            onClick={toggleDialog}
          >
            {t('timeframe.custom.cancel')}
          </Button>
          <Button
            className='go-to-range-dialog--button'
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

TimeFrameDialog.propTypes = propTypes
TimeFrameDialog.defaultProps = defaultProps

export default memo(TimeFrameDialog)
