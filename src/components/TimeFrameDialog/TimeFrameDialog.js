import React, { memo } from 'react'
import {
  Classes,
  Dialog,
} from '@blueprintjs/core'

import Icon from 'icons'
import TimeFrame from 'ui/TimeFrame'
import { formatDate } from 'state/utils'

import { propTypes, defaultProps } from './TimeFrameDialog.props'

const TimeFrameDialog = ({
  isOpen,
  end,
  start,
  timezone,
  toggleDialog,
}) => {
  if (!isOpen) {
    return null
  }

  return (
    <Dialog
      icon={<Icon.CALENDAR />}
      className='time-frame-dialog'
      isCloseButtonShown
      isOpen={isOpen}
      onClose={toggleDialog}
      title={`${formatDate(start, timezone)} - ${formatDate(end, timezone)}`}
    >
      <div className={Classes.DIALOG_BODY}>
        <TimeFrame />
      </div>
    </Dialog>
  )
}

TimeFrameDialog.propTypes = propTypes
TimeFrameDialog.defaultProps = defaultProps

export default memo(TimeFrameDialog)
