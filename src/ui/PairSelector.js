import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Intent,
  MenuItem,
} from '@blueprintjs/core'
import { Select } from '@blueprintjs/select'
import { IconNames } from '@blueprintjs/icons'

import { formatPair } from 'state/symbols/utils'

class PairSelector extends PureComponent {
  filterPair = (query, pair) => pair.indexOf(query.replace('/', '').toUpperCase()) >= 0

  renderPair = (pair, { modifiers }) => {
    if (!modifiers.matchesPredicate) {
      return null
    }
    const {
      currentPair, existingPairs, wildCard, onPairSelect,
    } = this.props
    const isCurrent = currentPair === pair
    const className = (wildCard.includes(pair) || existingPairs.includes(pair)) && !isCurrent
      ? 'bitfinex-queried-symbol' : ''

    return (
      <MenuItem
        className={className}
        active={modifiers.active}
        intent={isCurrent ? Intent.PRIMARY : Intent.NONE}
        disabled={modifiers.disabled}
        key={pair}
        onClick={() => onPairSelect(pair)}
        text={formatPair(pair)}
      />
    )
  }

  render() {
    const { currentPair, onPairSelect, pairs } = this.props

    return (
      <Select
        disabled={!pairs.length}
        items={pairs}
        itemRenderer={this.renderPair}
        itemPredicate={this.filterPair}
        onItemSelect={onPairSelect}
      >
        <Button
          text={formatPair(currentPair)}
          rightIcon={IconNames.CARET_DOWN}
          disabled={!pairs.length}
        />
      </Select>
    )
  }
}

PairSelector.propTypes = {
  currentPair: PropTypes.string.isRequired,
  existingPairs: PropTypes.arrayOf(PropTypes.string),
  onPairSelect: PropTypes.func.isRequired,
  pairs: PropTypes.arrayOf(PropTypes.string),
  wildCard: PropTypes.arrayOf(PropTypes.string),
}
PairSelector.defaultProps = {
  pairs: [],
  existingPairs: [],
  wildCard: [],
}

export default PairSelector
