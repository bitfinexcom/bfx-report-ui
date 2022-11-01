import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'
import {
  Button,
  Classes,
  Dialog,
  Intent,
} from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'

import { propTypes, defaultProps } from './PaginationDialog.props'

class PaginationDialog extends PureComponent {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    latestPaginationTimestamp: PropTypes.number,
    getFullTime: PropTypes.func.isRequired,
    toggleDialog: PropTypes.func.isRequired,
    proceedRequest: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
  }

  static defaultProps = {
    latestPaginationTimestamp: undefined,
  }

  handleProceed = (shouldProceed) => {
    const { toggleDialog, proceedRequest } = this.props

    proceedRequest(shouldProceed)
    toggleDialog(false)
  }

  render() {
    const {
      isOpen, latestPaginationTimestamp, getFullTime, t,
    } = this.props
    if (!isOpen) {
      return null
    }

    return (
      <Dialog
        icon={IconNames.CONFIRM}
        isCloseButtonShown={false}
        isOpen={isOpen}
        onClose={() => this.handleProceed(false)}
        title={t('pagination.no_results')}
      >
        <div className={Classes.DIALOG_BODY}>
          {t('pagination.last_data_timestamp', { date: getFullTime(latestPaginationTimestamp) })}
        </div>
        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button onClick={() => this.handleProceed(false)}>
              {t('framework.cancel')}
            </Button>
            <Button intent={Intent.PRIMARY} onClick={() => this.handleProceed(true)}>
              {t('pagination.proceed')}
            </Button>
          </div>
        </div>
      </Dialog>
    )
  }
}

PaginationDialog.propTypes = propTypes
PaginationDialog.defaultProps = defaultProps

export default withTranslation('translations')(PaginationDialog)
