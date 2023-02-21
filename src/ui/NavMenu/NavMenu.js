import React, { memo, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {
  Menu,
  Collapse,
  MenuItem,
  MenuDivider,
} from '@blueprintjs/core'
import _map from 'lodash/map'
import _isNull from 'lodash/isNull'
import _includes from 'lodash/includes'
import _castArray from 'lodash/castArray'

import Icons from 'icons'
import { getPath, getTarget } from 'state/query/utils'

import menuTypes from './NavMenu.constants'
import { getSections, getMenuItemChevron } from './NavMenu.helpers'

const {
  MENU_MY_ACCOUNT,
  MENU_MY_HISTORY,
  MENU_MARKET_HISTORY,
  MENU_MERCHANT_HISTORY,
} = menuTypes

const NavMenu = ({
  t,
  history,
  className,
  isTurkishSite,
}) => {
  const [isMyAccountOpen, setIsMyAccountOpen] = useState(false)
  const [isMyHistoryOpen, setIsMyHistoryOpen] = useState(false)
  const [isMarketHistoryOpen, setIsMarketHistoryOpen] = useState(false)
  const [isMerchantHistoryOpen, setIsMerchantHistoryOpen] = useState(false)

  const handleItemClick = (e, nextTarget) => {
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
      const [type, title, isSkipped, sectionTargets = null] = section

      if (isSkipped) {
        return null
      }

      const types = _castArray(type)
      const mainType = types[0]
      const [path] = _castArray(getPath(mainType))
      const isSubsectionActive = !_isNull(sectionTargets)
        && _includes(sectionTargets, target)

      return (
        <MenuItem
          href={path}
          key={mainType}
          text={t(title)}
          className='menu_sub_item'
          onClick={(e) => handleItemClick(e, type)}
          active={_includes(types, target) || isSubsectionActive}
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
        icon={<Icons.ADDRESS_BOOK />}
        text={t('navItems.myAccount.title')}
        labelElement={getMenuItemChevron(isMyAccountOpen)}
        onClick={() => setIsMyAccountOpen(!isMyAccountOpen)}
      />
      <Collapse
        keepChildrenMounted
        isOpen={isMyAccountOpen}
        className='sub_items_menu'
      >
        {getMenuItems(MENU_MY_ACCOUNT, target)}
      </Collapse>
      <MenuItem
        icon={<Icons.BOOK />}
        text={t('navItems.myHistory.title')}
        labelElement={getMenuItemChevron(isMyHistoryOpen)}
        onClick={() => setIsMyHistoryOpen(!isMyHistoryOpen)}
      />
      <Collapse
        keepChildrenMounted
        isOpen={isMyHistoryOpen}
        className='sub_items_menu'
      >
        {getMenuItems(MENU_MY_HISTORY, target)}
      </Collapse>
      {!isTurkishSite && (
        <>
          <MenuItem
            icon={<Icons.CART />}
            text={t('navItems.merchantHistory.title')}
            labelElement={getMenuItemChevron(isMerchantHistoryOpen)}
            onClick={() => setIsMerchantHistoryOpen(!isMerchantHistoryOpen)}
          />
          <Collapse
            keepChildrenMounted
            isOpen={isMerchantHistoryOpen}
            className='sub_items_menu'
          >
            {getMenuItems(MENU_MERCHANT_HISTORY, target)}
          </Collapse>
        </>
      )}
      <MenuItem
        icon={<Icons.CHART />}
        text={t('navItems.marketHistory.title')}
        labelElement={getMenuItemChevron(isMarketHistoryOpen)}
        onClick={() => setIsMarketHistoryOpen(!isMarketHistoryOpen)}
      />
      <Collapse
        keepChildrenMounted
        className='sub_items_menu'
        isOpen={isMarketHistoryOpen}
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

export default memo(NavMenu)
