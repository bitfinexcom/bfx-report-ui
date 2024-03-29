import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames'
import {
  Switch,
  Popover,
  Position,
  Alignment,
} from '@blueprintjs/core'

import Icon from 'icons'
import { tracker } from 'utils/trackers'
import InputKey from 'components/Auth/InputKey'
import { getMinimumBalance, getUseMinBalance } from 'state/summaryByAsset/selectors'
import { setMinimumBalance, toggleUseMinimumBalance } from 'state/summaryByAsset/actions'

const SummaryFilters = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const minimumBalance = useSelector(getMinimumBalance)
  const useMinimumBalance = useSelector(getUseMinBalance)
  const [isOpen, setIsOpen] = useState(false)
  const [balanceValue, setBalanceValue] = useState(minimumBalance)

  const togglePopover = (isPopoverOpen) => {
    tracker.trackEvent('Filter')
    setIsOpen(isPopoverOpen)
  }

  const onChange = (event) => {
    const { value } = event.target
    setBalanceValue(value)
    dispatch(setMinimumBalance(value))
  }

  const toggleinimumBalance = () => {
    tracker.trackEvent('Minimum Balance')
    dispatch(toggleUseMinimumBalance())
  }

  const classes = classNames('summary-filters--menu', {
    'summary-filters--menu-open': isOpen,
  })

  const switchClasses = classNames('switch-btn', {
    active: useMinimumBalance,
  })

  return (
    <div className={classes}>
      <Popover
        minimal
        autoFocus={false}
        usePortal={false}
        position={Position.BOTTOM_RIGHT}
        onOpening={() => togglePopover(true)}
        onClosing={() => togglePopover(false)}
        content={(
          <div className='summary-filters--menu-content'>
            <div className='switch-row'>
              <div className='switch-title'>
                {t('summary.by_asset.filter.min_balance_switch')}
              </div>
              <Switch
                large
                className={switchClasses}
                checked={useMinimumBalance}
                alignIndicator={Alignment.RIGHT}
                onChange={toggleinimumBalance}
              />
            </div>
            <div className='balance-input-label'>
              {t('summary.by_asset.filter.min_balance_input')}
            </div>
            <div className='balance-input'>
              <InputKey
                type='number'
                name='minimumBalance'
                value={balanceValue}
                onChange={onChange}
                disabled={!useMinimumBalance}
              />
              <span className='balance-input-currency'>
                USD
              </span>
            </div>
          </div>
          )}
        targetTagName='div'
        popoverClassName='summary-filters--menu-popover'
      >
        <div className='summary-filters--button'>
          <Icon.FILTER_SUMMARY />
          <span>{t('summary.by_asset.filter.title')}</span>
        </div>
      </Popover>
    </div>
  )
}

export default SummaryFilters
