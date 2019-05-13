import React, { PureComponent } from 'react'
import { Checkbox } from '@blueprintjs/core'

import { propTypes, defaultProps } from './ShowMilliseconds.props'

class ShowMilliseconds extends PureComponent {
  handleChange = () => {
    const {
      milliseconds,
      showMilliseconds,
    } = this.props
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
