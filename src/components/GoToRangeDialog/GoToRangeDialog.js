import React, { memo, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Classes,
  Dialog,
  Intent,
} from '@blueprintjs/core'

import Icon from 'icons'
import GoToRange from 'ui/GoToRange'
import gotToRangeTypes from 'state/goToRange/constants'

const GoToRangeDialog = ({
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
    range: timeRange.range || gotToRangeTypes.DAY,
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
      icon={<Icon.GO_TO />}
      className='go-to-range-dialog'
      isCloseButtonShown={false}
      isOpen={isOpen}
      onClose={toggleDialog}
      title={t('timeframe.go_to')}
    >
      <div className={Classes.DIALOG_BODY}>
        <GoToRange
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
            {t('timeframe.go_to')}
          </Button>
        </div>
      </div>
    </Dialog>
  )
}

GoToRangeDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  end: PropTypes.number,
  start: PropTypes.number,
  t: PropTypes.func.isRequired,
  timeRange: PropTypes.shape({
    end: PropTypes.number,
    range: PropTypes.string.isRequired,
    start: PropTypes.number,
  }).isRequired,
  setTimeRange: PropTypes.func.isRequired,
  toggleDialog: PropTypes.func.isRequired,
}

GoToRangeDialog.defaultProps = {
  start: 0,
  end: 0,
}

export default memo(GoToRangeDialog)
