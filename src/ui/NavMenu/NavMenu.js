import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {
  Collapse,
  Menu,
  MenuDivider,
  MenuItem,
} from '@blueprintjs/core'
import _map from 'lodash/map'
import _isEqual from 'lodash/isEqual'
import _castArray from 'lodash/castArray'

import Icons from 'icons'
import { getPath, getTarget } from 'state/query/utils'

import menuTypes from './NavMenu.constants'
import { getSections } from './NavMenu.helpers'

const {
  MENU_MY_ACCOUNT,
  MENU_MY_HISTORY,
  MENU_MERCHANT_HISTORY,
  MENU_MARKET_HISTORY,
} = menuTypes

const NavMenu = ({
  t,
  history,
  className,
  isTurkishSite,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleCollapse = () => setIsOpen(!isOpen)

  const handleClick = (e, nextTarget) => {
    e.preventDefault()

    const [path] = _castArray(getPath(nextTarget))
    history.push({
      pathname: path,
      search: window.location.search,
    })
    window.scrollTo(0, 0) // scroll to the top of the page on section change
  }

  const getMenuItems = (menuType, target) => (
    _map(getSections(menuType, isTurkishSite), (section) => {
      const [type, title, isSkipped] = section

      if (isSkipped) {
        return null
      }
      const path = getPath(type)

      return (
        <MenuItem
          key={type}
          href={path}
          text={t(title)}
          className='menu_sub_item'
          active={_isEqual(type, target)}
          onClick={(e) => handleClick(e, type)}
        />
      )
    })
  )

  const classes = classNames('bitfinex-nav-menu', className)
  const target = getTarget(history.location.pathname, false)

  return (
    <Menu large className={classes}>
      <MenuItem
        className='reports_title'
        icon={<Icons.PIE_CHART />}
        text={t('navItems.reports')}
      />
      <MenuDivider />
      <MenuItem
        icon={<Icons.NOTEBOOK />}
        text={t('navItems.myAccount.title')}
        onClick={() => toggleCollapse()}
      />
      <Collapse
        isOpen={isOpen}
        keepChildrenMounted
        className='sub_items_menu'
      >
        {getMenuItems(MENU_MY_ACCOUNT, target)}
      </Collapse>
      <MenuItem
        icon={<Icons.NOTEBOOK />}
        text={t('navItems.myHistory.title')}
        onClick={() => toggleCollapse()}
      />
      <Collapse
        isOpen={isOpen}
        keepChildrenMounted
        className='sub_items_menu'
      >
        {getMenuItems(MENU_MY_HISTORY, target)}
      </Collapse>
      {!isTurkishSite && (
        <>
          <MenuItem
            icon={<Icons.NOTEBOOK />}
            onClick={() => toggleCollapse()}
            text={t('navItems.merchantHistory.title')}
          />
          <Collapse
            isOpen={isOpen}
            keepChildrenMounted
            className='sub_items_menu'
          >
            {getMenuItems(MENU_MERCHANT_HISTORY, target)}
          </Collapse>
        </>
      )}
      <MenuItem
        icon={<Icons.NOTEBOOK />}
        onClick={() => toggleCollapse()}
        text={t('navItems.marketHistory.title')}
      />
      <Collapse
        isOpen={isOpen}
        keepChildrenMounted
        className='sub_items_menu'
      >
        {getMenuItems(MENU_MARKET_HISTORY, target)}
      </Collapse>
    </Menu>
  )
}

NavMenu.propTypes = {
  className: PropTypes.string,
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      search: PropTypes.string.isRequired,
    }).isRequired,
    push: PropTypes.func.isRequired,
  }).isRequired,
  t: PropTypes.func.isRequired,
  isTurkishSite: PropTypes.bool.isRequired,
}

NavMenu.defaultProps = {
  className: '',
}

export default NavMenu
