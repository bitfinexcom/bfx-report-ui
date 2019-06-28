import React, { PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import moment from 'moment-timezone'
import {
  Button,
  Classes,
  Dialog,
  Intent,
  Position,
} from '@blueprintjs/core'
import { DateRangeInput } from '@blueprintjs/datetime'
import { IconNames } from '@blueprintjs/icons'

import { DEFAULT_DATETIME_FORMAT, momentFormatter } from 'state/utils'

import { propTypes, defaultProps } from './CustomDialog.props'

const SMALL_DATE_RANGE_POPOVER_PROPS = {
  position: Position.TOP,
}

class CustomDialog extends PureComponent {
  createShortcut = (label, dateRange) => ({ dateRange, label, includeTime: true })

  createShortcuts = () => {
    const { t } = this.props
    const today = new Date()
    const makeDate = (action) => {
      const returnVal = new Date()
      action(returnVal)
      returnVal.setDate(returnVal.getDate() + 1)
      return returnVal
    }

    const pastDay = makeDate(d => d.setDate(d.getDate() - 1))
    const twoWeeksAgo = makeDate(d => d.setDate(d.getDate() - 14))
    const oneMonthAgo = makeDate(d => d.setMonth(d.getMonth() - 1))
    const threeMonthsAgo = makeDate(d => d.setMonth(d.getMonth() - 3))
    const oneYearAgo = makeDate(d => d.setFullYear(d.getFullYear() - 1))
    const twoYearsAgo = makeDate(d => d.setFullYear(d.getFullYear() - 2))

    const currentYearStart = new Date(today.getFullYear(), 0, 1)
    const lastYearStart = new Date(today.getFullYear() - 1, 0, 1)
    const lastYearEnd = new Date(today.getFullYear() - 1, 11, 31, 23, 59, 59)

    return [
      this.createShortcut(t('timeframe.24h'), [pastDay, today]),
      this.createShortcut(t('timeframe.2w'), [twoWeeksAgo, today]),
      this.createShortcut(t('timeframe.past_month'), [oneMonthAgo, today]),
      this.createShortcut(t('timeframe.past_3m'), [threeMonthsAgo, today]),
      this.createShortcut(t('timeframe.past_year'), [oneYearAgo, today]),
      this.createShortcut(t('timeframe.past_2y'), [twoYearsAgo, today]),
      this.createShortcut(t('timeframe.custom_year', { year: today.getFullYear() }), [currentYearStart, today]),
      this.createShortcut(t('timeframe.custom_year', { year: today.getFullYear() - 1 }), [lastYearStart, lastYearEnd]),
    ]
  }

  handleRangeChange = (range) => {
    const { updateWarningStatus, handleRangeChange } = this.props
    const [startDate] = range
    const sixYearsPast = moment().add({ years: -6 })

    if (sixYearsPast.isAfter(startDate)) {
      updateWarningStatus({
        id: 'status.warn',
        topic: 'timeframe.range_limit',
      })
      return
    }

    handleRangeChange(range)
  }

  render() {
    const {
      endDate,
      handleCustomDialogClose,
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
      onChange: this.handleRangeChange,
      value: [startDate, endDate],
      maxDate: new Date(),
      placeholder: t('timeframe.start-date-placeholder'),
    }

    return isCustomOpen ? (
      <Dialog
        icon={IconNames.CALENDAR}
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
            shortcuts={this.createShortcuts()}
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

CustomDialog.propTypes = propTypes
CustomDialog.defaultProps = defaultProps

export default withTranslation('translations')(CustomDialog)
