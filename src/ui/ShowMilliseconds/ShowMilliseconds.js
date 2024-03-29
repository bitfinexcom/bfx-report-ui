import React, { PureComponent } from 'react'
import { Checkbox } from '@blueprintjs/core'

import { tracker } from 'utils/trackers'

import { propTypes, defaultProps } from './ShowMilliseconds.props'

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

ShowMilliseconds.propTypes = propTypes
ShowMilliseconds.defaultProps = defaultProps

export default ShowMilliseconds
