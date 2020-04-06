import React, { PureComponent } from 'react'
import classNames from 'classnames'
import {
  Intent,
  MenuItem,
} from '@blueprintjs/core'

import MultiSelect from 'ui/MultiSelect'
import { filterSelectorItem } from 'ui/utils'

import { propTypes, defaultProps } from './MultiPairSelector.props'

class MultiPairSelector extends PureComponent {
  renderPair = (pair, { modifiers, handleClick }) => {
    const { active, disabled, matchesPredicate } = modifiers
    if (!matchesPredicate) {
      return null
    }
    const { currentFilters, existingPairs } = this.props
    const isCurrent = currentFilters.includes(pair)
    const classes = classNames({
      'bitfinex-queried-symbol': existingPairs.includes(pair) && !isCurrent && !active,
      'bp3-menu-item--selected': isCurrent,
    })

    return (
      <MenuItem
        className={classes}
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
      currentFilters,
      existingPairs,
      pairs,
      togglePair,
    } = this.props

    const items = pairs.length
      ? pairs
      : existingPairs

    return (
      <MultiSelect
        disabled={!pairs.length && !existingPairs.length}
        items={items}
        itemRenderer={this.renderPair}
        itemPredicate={filterSelectorItem}
        onItemSelect={togglePair}
        tagInputProps={{
          tagProps: { minimal: true },
          onRemove: togglePair,
        }}
        tagRenderer={pair => pair}
        selectedItems={currentFilters}
      />
    )
  }
}

MultiPairSelector.propTypes = propTypes
MultiPairSelector.defaultProps = defaultProps

export default MultiPairSelector
