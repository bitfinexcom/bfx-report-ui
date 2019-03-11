import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withNamespaces } from 'react-i18next'
import {
  Button,
  Classes,
  Dialog,
  Intent,
  Position,
} from '@blueprintjs/core'
import { DateRangeInput } from '@blueprintjs/datetime'

import { DEFAULT_DATETIME_FORMAT, momentFormatter } from 'state/utils'

const SMALL_DATE_RANGE_POPOVER_PROPS = {
  position: Position.TOP,
}

class CustomDialog extends PureComponent {
  componentDidMount() {
    this.maxDate = new Date()
  }

  render() {
    const {
      endDate,
      handleCustomDialogClose,
      handleRangeChange,
      isCustomOpen,
      startQuery,
      startDate,
      t,
      timezone,
    } = this.props
    const { formatDate, parseDate } = momentFormatter(DEFAULT_DATETIME_FORMAT, timezone)
    const commonDateRangeProps = {
      allowSingleDayRange: true,
      closeOnSelection: true,
      formatDate,
      parseDate,
      onChange: handleRangeChange,
      value: [startDate, endDate],
      maxDate: this.maxDate,
      placeholder: t('timeframe.start-date-placeholder'),
    }

    return isCustomOpen ? (
      <Dialog
        icon='calendar'
        onClose={handleCustomDialogClose}
        title={t('timeframe.custom.title')}
        autoFocus
        canEscapeKeyClose
        canOutsideClickClose
        enforceFocus
        usePortal
        isOpen={isCustomOpen}
      >
        <div className={Classes.DIALOG_BODY}>
          <DateRangeInput
            {...commonDateRangeProps}
            className='hidden-xs col-sm-12 col-md-12 col-lg-12 col-xl-12'
          />
          <DateRangeInput
            {...commonDateRangeProps}
            className='col-xs-12 hidden-sm hidden-md hidden-lg hidden-xl'
            shortcuts={false}
            popoverProps={SMALL_DATE_RANGE_POPOVER_PROPS}
          />
        </div>
        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button
              intent={Intent.PRIMARY}
              onClick={startQuery}
              disabled={!startDate || !endDate}
            >
              {t('timeframe.custom.view')}
            </Button>
          </div>
        </div>
      </Dialog>
    ) : null
  }
}

CustomDialog.propTypes = {
  handleCustomDialogClose: PropTypes.func.isRequired,
  handleRangeChange: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  isCustomOpen: PropTypes.bool.isRequired,
  startQuery: PropTypes.func.isRequired,
  startDate: PropTypes.instanceOf(Date),
  timezone: PropTypes.string,
  endDate: PropTypes.instanceOf(Date),
}

CustomDialog.defaultProps = {
  startDate: null,
  endDate: null,
  timezone: '',
}

export default withNamespaces('translations')(CustomDialog)
