import React, { useState, memo } from 'react'
// import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import classNames from 'classnames'
import {
  Popover,
  Position,
} from '@blueprintjs/core'

import Icon from 'icons'

import { getMinimumBalance } from 'state/summaryByAsset/selectors'

const SummaryFilters = () => {
  // const { t } = useTranslation()
  const minimumBalance = useSelector(getMinimumBalance)
  const [isOpen, setIsOpen] = useState(false)

  const togglePopover = (isPopoverOpen) => {
    setIsOpen(isPopoverOpen)
  }

  const classes = classNames('.summary-filters--menu', {
    '.summary-filters--menu-open': isOpen,
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
            Minimum Balance:
            {' '}
            {minimumBalance}
          </div>
          )}
        targetTagName='div'
        popoverClassName='summary-filters--menu-popover'
      >
        <span>
          <Icon.FILTER_SUMMARY />
        </span>
      </Popover>
    </div>
  )
}

export default memo(SummaryFilters)
