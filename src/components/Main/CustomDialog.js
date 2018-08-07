import React, { PureComponent } from 'react'
import { injectIntl } from 'react-intl'
import {
  Button,
  Classes,
  Dialog,
  Intent,
} from '@blueprintjs/core'
import { DateRangeInput } from '@blueprintjs/datetime'
import { momentFormatter } from 'state/utils'
import { customDialogPropTypes, customDialogDefaultProps } from './Main.props'

const DATE_FORMAT = momentFormatter('YYYY-MM-DD HH:mm:ss')

class CustomDialog extends PureComponent {
  render() {
    const {
      handleCustomDialogClose,
      handleRangeChange,
      intl,
      isCustomOpen,
      startQuery,
      startDate,
      endDate,
    } = this.props
    return isCustomOpen ? (
      <Dialog
        icon='calendar'
        onClose={handleCustomDialogClose}
        title={intl.formatMessage({ id: 'timeframe.custom.title' })}
        autoFocus
        canEscapeKeyClose
        canOutsideClickClose
        enforceFocus
        usePortal
        isOpen={isCustomOpen}
      >
        <div className={Classes.DIALOG_BODY}>
          <DateRangeInput
            allowSingleDayRange
            closeOnSelection
            formatDate={DATE_FORMAT.formatDate}
            parseDate={DATE_FORMAT.parseDate}
            onChange={handleRangeChange}
            value={[startDate, endDate]}
            maxDate={new Date()}
          />
        </div>
        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button
              intent={Intent.PRIMARY}
              onClick={startQuery}
              disabled={!startDate || !endDate}
            >
              {intl.formatMessage({ id: 'timeframe.custom.view' })}
            </Button>
          </div>
        </div>
      </Dialog>
    ) : ''
  }
}

CustomDialog.propTypes = customDialogPropTypes
CustomDialog.defaultProps = customDialogDefaultProps

export default injectIntl(CustomDialog)
