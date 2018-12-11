import React, { PureComponent } from 'react'
import { injectIntl } from 'react-intl'
import {
  Button,
  Classes,
  Dialog,
  ButtonGroup,
  Intent,
} from '@blueprintjs/core'

import { dialogDescStyle, dialogFieldStyle, dialogSmallDescStyle } from 'ui/utils'

// import { propTypes, defaultProps } from './SyncPrefDialog.props'

class PrefDialog extends PureComponent {
  // static propTypes = propTypes

  // static defaultProps = defaultProps

  // constructor(props) {
  //   super(props)
  // }

  render() {
    const {
      handleSyncPrefDialogClose,
      intl,
      isSyncPrefOpen,
    } = this.props
    if (!isSyncPrefOpen) {
      return null
    }
    return (
      <Dialog
        icon='person'
        onClose={handleSyncPrefDialogClose}
        title={intl.formatMessage({ id: 'preferences.title' })}
        autoFocus
        canEscapeKeyClose
        canOutsideClickClose
        enforceFocus
        usePortal
        isOpen={isSyncPrefOpen}
      >
        <div className={Classes.DIALOG_BODY}>
          <div className='row'>
            {/* <div className={dialogDescStyle}>
              {intl.formatMessage({ id: 'preferences.language' })}
            </div>
            <div className={dialogSmallDescStyle}>
              {intl.formatMessage({ id: 'preferences.language' })}
            </div>
            <div className={dialogFieldStyle}>
              <LangMenu />
            </div> */}
          </div>
        </div>
        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            {/* <Button onClick={handlePrefDialogClose}>
              {intl.formatMessage({ id: 'preferences.apply' })}
            </Button> */}
            <Button onClick={handleSyncPrefDialogClose}>
              {intl.formatMessage({ id: 'preferences.close' })}
            </Button>
          </div>
        </div>
      </Dialog>
    )
  }
}

export default injectIntl(PrefDialog)
