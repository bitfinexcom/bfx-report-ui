import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Checkbox } from '@blueprintjs/core'

import { tracker } from 'utils/trackers'

class ShowMilliseconds extends PureComponent {
  handleChange = () => {
    const {
      milliseconds,
      showMilliseconds,
    } = this.props
    tracker.trackEvent('Display Milliseconds')
    showMilliseconds(!milliseconds)
  }

  render() {
    const {
      milliseconds,
    } = this.props
    return (
      <Checkbox
        checked={milliseconds}
        onChange={this.handleChange}
        large
      />
    )
  }
}

ShowMilliseconds.propTypes = {
  milliseconds: PropTypes.bool,
  showMilliseconds: PropTypes.func,
}

ShowMilliseconds.defaultProps = {
  milliseconds: false,
  showMilliseconds: () => {},
}

export default ShowMilliseconds
