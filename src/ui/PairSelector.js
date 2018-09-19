import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Intent,
  MenuItem,
} from '@blueprintjs/core'
import { Select } from '@blueprintjs/select'

import { formatPair } from 'state/utils'

class PairSelector extends PureComponent {
  render() {
    const {
      currentPair,
      existingPairs,
      onPairSelect,
      pairList,
      pairs,
      wildCard,
    } = this.props

    const renderPair = (pair, { modifiers }) => {
      if (!modifiers.matchesPredicate) {
        return null
      }
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
          onClick={onPairSelect(pair)}
          text={formatPair(pair)}
        />
      )
    }

    const filterPair = (query, pair) => pair.toLowerCase().indexOf(query.replace('/', '').toLowerCase()) >= 0

    return (
      <Select
        disabled={pairs.length === 0}
        items={pairList}
        itemRenderer={renderPair}
        itemPredicate={filterPair}
        onItemSelect={onPairSelect}
      >
        <Button
          text={formatPair(currentPair)}
          rightIcon='caret-down'
          disabled={pairs.length === 0}
        />
      </Select>
    )
  }
}

PairSelector.propTypes = {
  currentPair: PropTypes.string.isRequired,
  existingPairs: PropTypes.arrayOf(PropTypes.string),
  onPairSelect: PropTypes.func.isRequired,
  pairList: PropTypes.arrayOf(PropTypes.string),
  pairs: PropTypes.arrayOf(PropTypes.string),
  wildCard: PropTypes.arrayOf(PropTypes.string),
}
PairSelector.defaultProps = {
  pairs: [],
  pairList: [],
  existingPairs: [],
  wildCard: [],
}

export default PairSelector
