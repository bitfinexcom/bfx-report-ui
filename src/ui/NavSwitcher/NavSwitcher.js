import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { tracker } from 'utils/trackers'

const NavSwitcher = (props) => {
  const { items, onChange, value: activeItem } = props
  const handleClick = (itemValue) => {
    tracker.trackEvent(itemValue, 'Tab')
    onChange(itemValue)
  }

  return (
    <div className='nav-switcher'>
      {items.map((item) => {
        const { label, value: itemValue } = item
        const itemClasses = classNames('nav-switcher-item', {
          'nav-switcher-item--active': itemValue === activeItem,
        })

        return (
          <span className={itemClasses} onClick={() => handleClick(itemValue)} key={itemValue}>
            {label}
          </span>
        )
      })}
    </div>
  )
}

NavSwitcher.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  })).isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
}

export default NavSwitcher
