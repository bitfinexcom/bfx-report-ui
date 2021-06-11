import React, { memo } from 'react'
import {
  Button,
  Classes,
  Dialog,
  Intent,
} from '@blueprintjs/core'

import Icon from 'icons'
import TimeFrame from 'ui/TimeFrame'
import { formatDate } from 'state/utils'

import { propTypes, defaultProps } from './TimeFrameDialog.props'

const TimeFrameDialog = ({
  isOpen,
  end,
  start,
  t,
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
      isCloseButtonShown={false}
      isOpen={isOpen}
      onClose={toggleDialog}
      title={`${formatDate(start, timezone)} - ${formatDate(end, timezone)}`}
    >
      <div className={Classes.DIALOG_BODY}>
        <TimeFrame />
      </div>
      <div className={Classes.DIALOG_FOOTER}>
        <div className='time-frame-dialog--buttons-row'>
          <Button
            className='time-frame-dialog--button'
            intent={Intent.NONE}
            onClick={toggleDialog}
          >
            {t('dialog.cancel')}
          </Button>
          <Button
            className='time-frame-dialog--button'
            intent={Intent.PRIMARY}
            onClick={toggleDialog}
          >
            {t('dialog.confirm')}
          </Button>
        </div>
      </div>
    </Dialog>
  )
}

TimeFrameDialog.propTypes = propTypes
TimeFrameDialog.defaultProps = defaultProps

export default memo(TimeFrameDialog)
