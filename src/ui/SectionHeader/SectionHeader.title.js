import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'

import Icon from 'icons'
import NavMenu from 'ui/NavMenu'

import Classes from './SectionHeader.classes'

class SectionHeaderTitle extends PureComponent {
  state = {
    isOpen: false,
  }

  onToggle = () => {
    this.setState(({ isOpen }) => ({ isOpen: !isOpen }))
  }

  render() {
    const { children } = this.props
    const { isOpen } = this.state

    const icon = isOpen
      ? <Icon.CHEVRON_UP />
      : <Icon.CHEVRON_DOWN />

    return (
      <div className={Classes.SECTION_HEADER_TITLE}>
        <span className='section-header-title--main'>{children}</span>
        <div className='section-header-title--mobile'>
          <div className='section-header-title--mobile-section' onClick={this.onToggle}>
            <Icon.NOTEBOOK className='section-header-title--mobile-icon' />
            <span>{children}</span>
            {icon}
          </div>
          {isOpen && <NavMenu className='bitfinex-nav-menu--mobile' />}
        </div>
      </div>
    )
  }
}

SectionHeaderTitle.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
  ]).isRequired,
}

export default withTranslation('translations')(SectionHeaderTitle)
