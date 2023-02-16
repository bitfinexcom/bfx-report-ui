import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'

import Icon from 'icons'

class HamburgerMenu extends PureComponent {
  static propTypes = {
    icon: PropTypes.bool,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    setTimeRange: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    location: PropTypes.shape({
      search: PropTypes.string.isRequired,
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }

  static defaultProps = {
    icon: true,
  }

  onClick = () => {
    const { type, setTimeRange } = this.props
    this.resetRangeQuery()
    setTimeRange({ range: type })
  }

  resetRangeQuery = () => {
    const { location, history } = this.props
    const parsed = queryString.parse(location.search)
    const { range, ...params } = parsed
    history.push(`${location.pathname}?${queryString.stringify(params, { encode: false })}`)
  }

  render() {
    const {
      t,
      icon,
      title,
    } = this.props

    return (
      <div
        onClick={this.onClick}
        className='timeframe-shortcut'
      >
        <Icon.HAMBURGER_MENU />
      </div>
    )
  }
}

export default HamburgerMenu
