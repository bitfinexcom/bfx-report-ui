import React, { PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import {
  Classes,
  Dialog,
} from '@blueprintjs/core'

import TimeFrame from 'ui/TimeFrame'

import { propTypes, defaultProps } from './TimeFrameDialog.props'

class TimeFrameDialog extends PureComponent {
  render() {
    const {
      isOpen, t, toggleDialog,
    } = this.props
    if (!isOpen) {
      return null
    }

    return (
      <Dialog
        className='time-frame-dialog'
        isCloseButtonShown
        isOpen={isOpen}
        onClose={toggleDialog}
        title={t('selector.select')}
      >
        <div className={Classes.DIALOG_BODY}>
          <TimeFrame />
        </div>
      </Dialog>
    )
  }
}

TimeFrameDialog.propTypes = propTypes
TimeFrameDialog.defaultProps = defaultProps

export default withTranslation('translations')(TimeFrameDialog)
