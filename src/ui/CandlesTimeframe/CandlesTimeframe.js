import React from 'react'
import { HTMLSelect } from '@blueprintjs/core'
import _map from 'lodash/map'

import { propTypes, defaultProps } from './CandlesTimeframe.props'
import TIMEFRAMES from './var'

class CandlesTimeframe extends React.PureComponent {
  onChange = (e) => {
    const { value } = e.target
    const { onChange } = this.props
    onChange(value)
  }

  render() {
    const { value, className } = this.props

    return (
      <HTMLSelect
        value={value}
        className={className}
        onChange={this.onChange}
      >
        {_map(TIMEFRAMES, timeframe => (
          <option key={timeframe} value={timeframe}>{timeframe}</option>
        ))}
      </HTMLSelect>
    )
  }
}

CandlesTimeframe.propTypes = propTypes
CandlesTimeframe.defaultProps = defaultProps

export default CandlesTimeframe
