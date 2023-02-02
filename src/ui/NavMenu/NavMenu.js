import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {
  Classes,
  Collapse,
  Menu,
  MenuDivider,
  MenuItem,
} from '@blueprintjs/core'
import _map from 'lodash/map'
import _includes from 'lodash/includes'
import _castArray from 'lodash/castArray'

import { getIcon, getPath, getTarget } from 'state/query/utils'

import NavMenuPopover from './NavMenuPopover'
import { getSections } from './NavMenu.helpers'

class NavMenu extends PureComponent {
  static propTypes = {
    target: PropTypes.string,
    className: PropTypes.string,
    history: PropTypes.shape({
      location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
        search: PropTypes.string.isRequired,
      }).isRequired,
      push: PropTypes.func.isRequired,
    }).isRequired,
    showMenuPopover: PropTypes.bool,
    t: PropTypes.func.isRequired,
    isTurkishSite: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    className: '',
    target: undefined,
    showMenuPopover: true,
  }

  state ={
    isOpen: false,
  }

  handleClick = (e, nextTarget) => {
    const { showMenuPopover } = this.props
    e.preventDefault()

    // imitate click to close the popover only in popover view
    if (!showMenuPopover) {
      // dismiss popover mode
      const { parentElement } = e.target
      parentElement.classList.add(Classes.POPOVER_DISMISS)
      parentElement.click()
    }

    const { target, history } = this.props
    if (target === nextTarget) {
      return
    }
    const [path] = _castArray(getPath(nextTarget))
    history.push({
      pathname: path,
      search: window.location.search,
    })
    window.scrollTo(0, 0) // scroll to the top of page on section change
  }

  toggleCollapse = () => {
    const { isOpen } = this.state
    this.setState({ isOpen: !isOpen })
  }

  render() {
    const {
      t,
      history,
      className,
      isTurkishSite,
      showMenuPopover,
    } = this.props
    const { isOpen } = this.state
    const target = getTarget(history.location.pathname, false)

    const classes = classNames('bitfinex-nav-menu', className)

    return (
      <Menu large className={classes}>
        <MenuItem
          text={'Toggle collapse'}
          onClick={() => this.toggleCollapse()}
        />
        <Collapse isOpen={isOpen}>
          {_map(getSections(isTurkishSite), (section, index) => {
            const [type, title, isSkipped] = section

            if (isSkipped) {
              return null
            }

            if (type === 'divider') {
            /* eslint-disable-next-line react/no-array-index-key */
              return <MenuDivider key={index} />
            }

            const types = _castArray(type)
            const mainType = types[0]

            const Icon = getIcon(mainType)
            const [path] = _castArray(getPath(mainType))

            return (
              <MenuItem
                href={path}
                key={mainType}
                text={t(title)}
                icon={<Icon />}
                active={_includes(types, target)}
                onClick={(e) => this.handleClick(e, mainType)}
              />
            )
          })}
        </Collapse>
        {showMenuPopover && window.innerWidth > 390 && window.innerWidth <= 1024 && <NavMenuPopover />}

        {_map(getSections(isTurkishSite), (section, index) => {
          const [type, title, isSkipped] = section

          if (isSkipped) {
            return null
          }

          if (type === 'divider') {
            /* eslint-disable-next-line react/no-array-index-key */
            return <MenuDivider key={index} />
          }

          const types = _castArray(type)
          const mainType = types[0]

          const Icon = getIcon(mainType)
          const [path] = _castArray(getPath(mainType))

          return (
            <MenuItem
              href={path}
              key={mainType}
              text={t(title)}
              icon={<Icon />}
              active={_includes(types, target)}
              onClick={(e) => this.handleClick(e, mainType)}
            />
          )
        })}
      </Menu>
    )
  }
}

export default NavMenu
