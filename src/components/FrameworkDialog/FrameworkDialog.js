import React, { PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import {
  Button, Checkbox,
  Classes,
  Dialog,
  Intent,
} from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'

import mode from 'state/sync/constants'

import { propTypes, defaultProps } from './FrameworkDialog.props'

class FrameworkDialog extends PureComponent {
  constructor() {
    super()

    this.state = {
      isFrameworkDialogDisabled: false,
    }

    this.handleCancel = this.handleProceed.bind(this, false)
    this.handleProceed = this.handleProceed.bind(this, true)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidUpdate(prevProps) {
    const { isFrameworkOpen, syncMode } = this.props
    if (isFrameworkOpen && prevProps.syncMode !== mode.MODE_OFFLINE && syncMode === mode.MODE_OFFLINE) {
      this.handleProceed(true)
    }
  }

  handleProceed(shouldProceed) {
    const { toggleDialog, proceedRequest } = this.props
    const { isFrameworkDialogDisabled } = this.state

    const options = {
      shouldProceed,
      isFrameworkDialogDisabled,
    }
    proceedRequest(options)
    toggleDialog()
  }

  handleChange(e) {
    const { checked } = e.target
    this.setState({
      isFrameworkDialogDisabled: checked,
    })
  }

  render() {
    const { isFrameworkOpen, t } = this.props
    const { isFrameworkDialogDisabled } = this.state
    if (!isFrameworkOpen) {
      return null
    }

    return (
      <Dialog
        icon={IconNames.CONFIRM}
        onClose={this.handleCancel}
        title={t('framework.title')}
        autoFocus
        canEscapeKeyClose
        canOutsideClickClose
        enforceFocus
        usePortal
        isOpen={isFrameworkOpen}
      >
        <div className={Classes.DIALOG_BODY}>
          <Checkbox
            checked={isFrameworkDialogDisabled}
            onChange={this.handleChange}
            label={t('framework.notagain')}
            className='bitfinex-framework-checkbox'
          />
        </div>
        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button onClick={this.handleCancel}>
              {t('framework.cancel')}
            </Button>
            <Button intent={Intent.PRIMARY} onClick={this.handleProceed}>
              {t('framework.proceed')}
            </Button>
          </div>
        </div>
      </Dialog>
    )
  }
}

FrameworkDialog.propTypes = propTypes
FrameworkDialog.defaultProps = defaultProps

export default withTranslation('translations')(FrameworkDialog)
