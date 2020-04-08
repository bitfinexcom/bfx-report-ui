import React, { PureComponent } from 'react'
import { Intent, MenuItem } from '@blueprintjs/core'

import Select from 'ui/Select'

import { propTypes, defaultProps } from './PairSelector.props'

class PairSelector extends PureComponent {
  itemRenderer = (pair, { modifiers, handleClick }) => {
    const { active, disabled, matchesPredicate } = modifiers
    if (!matchesPredicate) {
      return null
    }
    const { currentPair } = this.props
    const isCurrent = currentPair === pair

    return (
      <MenuItem
        active={active}
        intent={isCurrent ? Intent.PRIMARY : Intent.NONE}
        disabled={disabled}
        key={pair}
        onClick={handleClick}
        text={pair}
      />
    )
  }

  render() {
    const {
      currentPair, pairs, onPairSelect,
    } = this.props

    return (
      <Select
        popoverClassName='bitfinex-select-menu--pair'
        itemRenderer={this.itemRenderer}
        onChange={onPairSelect}
        filterable
        items={pairs}
        value={currentPair}
      />
    )
  }
}

PairSelector.propTypes = propTypes
PairSelector.defaultProps = defaultProps

export default PairSelector
