import React, { PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import {
  Button,
  Checkbox,
  Classes,
  Dialog,
  Intent,
} from '@blueprintjs/core'

import Icon from 'icons'
import mode from 'state/sync/constants'

import { propTypes, defaultProps } from './FrameworkDialog.props'

class FrameworkDialog extends PureComponent {
  state = {
    isFrameworkDialogDisabled: false,
  }

  componentDidUpdate(prevProps) {
    const { isFrameworkOpen, syncMode } = this.props
    if (isFrameworkOpen && prevProps.syncMode !== mode.MODE_OFFLINE && syncMode === mode.MODE_OFFLINE) {
      this.handleProceed(true)
    }
  }

  handleProceed = (shouldProceed) => {
    const { toggleDialog, proceedRequest } = this.props
    const { isFrameworkDialogDisabled } = this.state

    const options = {
      shouldProceed,
      isFrameworkDialogDisabled,
    }
    proceedRequest(options)
    toggleDialog()
  }

  handleChange = (e) => {
    const { checked } = e.target
    this.setState({
      isFrameworkDialogDisabled: checked,
    })
  }

  render() {
    const { isOpen, syncMode, t } = this.props
    const { isFrameworkDialogDisabled } = this.state

    const title = (syncMode === mode.MODE_SYNCING)
      ? t('framework.title')
      : t('framework.no_sync')

    return (
      <Dialog
        icon={<Icon.TRAY_IMPORT />}
        onClose={() => this.handleProceed(false)}
        title={title}
        isCloseButtonShown={false}
        isOpen={isOpen}
      >
        <div className={Classes.DIALOG_BODY}>
          <br />
          <Checkbox
            checked={isFrameworkDialogDisabled}
            onChange={this.handleChange}
            label={t('framework.notagain')}
            className='bitfinex-framework-checkbox'
          />
          <br />
          <br />
        </div>
        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button onClick={() => this.handleProceed(false)}>
              {t('framework.cancel')}
            </Button>
            <Button intent={Intent.PRIMARY} onClick={() => this.handleProceed(true)}>
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
