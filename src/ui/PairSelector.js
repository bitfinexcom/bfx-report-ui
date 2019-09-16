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
  filterPair = (query, pair) => pair.indexOf(query.toUpperCase()) >= 0

  renderPair = (pair, { modifiers }) => {
    if (!modifiers.matchesPredicate) {
      return null
    }
    const { currentPair, existingPairs, wildCard } = this.props
    const isCurrent = currentPair === pair.replace('/', ':')
    const className = (wildCard.includes(pair) || existingPairs.includes(pair)) && !isCurrent
      ? 'bitfinex-queried-symbol' : ''

    return (
      <MenuItem
        className={className}
        active={modifiers.active}
        intent={isCurrent ? Intent.PRIMARY : Intent.NONE}
        disabled={modifiers.disabled}
        key={pair}
        onClick={() => this.onPairSelect(pair)}
        text={pair}
      />
    )
  }

  onPairSelect = (pair) => {
    const { onPairSelect } = this.props

    onPairSelect(pair.replace('/', ':'))
  }

  render() {
    const { currentPair, pairs } = this.props

    return (
      <Select
        disabled={!pairs.length}
        items={pairs}
        itemRenderer={this.renderPair}
        itemPredicate={this.filterPair}
        onItemSelect={this.onPairSelect}
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
