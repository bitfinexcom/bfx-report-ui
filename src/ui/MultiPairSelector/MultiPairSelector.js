import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {
  Intent,
  MenuItem,
} from '@blueprintjs/core'

import MultiSelect from 'ui/MultiSelect'

class MultiPairSelector extends PureComponent {
  renderPair = (pair, { modifiers, handleClick }) => {
    const { active, disabled, matchesPredicate } = modifiers
    if (!matchesPredicate) {
      return null
    }
    const { currentFilters, existingPairs, t } = this.props
    const isCurrent = currentFilters.includes(pair)
    const text = pair === 'inactive' ? t('selector.inactive') : pair

    const classes = classNames({
      'bitfinex-queried-symbol': existingPairs.includes(pair) && !isCurrent && !active,
      'bp3-menu-item--selected': isCurrent,
    })

    return (
      <MenuItem
        key={pair}
        text={text}
        active={active}
        className={classes}
        onClick={handleClick}
        disabled={disabled || pair === 'inactive'}
        intent={isCurrent ? Intent.PRIMARY : Intent.NONE}
      />
    )
  }

  itemPredicate = (query, item) => {
    if (item === 'inactive') {
      const { inactivePairs } = this.props
      return !!inactivePairs.find((pair) => pair.toLowerCase().indexOf(query.toLowerCase()) >= 0)
    }

    return item.toLowerCase().indexOf(query.toLowerCase()) >= 0
  }

  render() {
    const {
      pairs,
      togglePair,
      inactivePairs,
      existingPairs,
      currentFilters,
    } = this.props

    const shownPairs = pairs.length
      ? pairs
      : existingPairs
    const items = inactivePairs.length
      ? [
        ...shownPairs,
        'inactive',
        ...inactivePairs,
      ]
      : shownPairs

    return (
      <MultiSelect
        items={items}
        onItemSelect={togglePair}
        tagInputProps={{
          tagProps: { minimal: true },
          onRemove: togglePair,
        }}
        tagRenderer={pair => pair}
        itemRenderer={this.renderPair}
        selectedItems={currentFilters}
        itemPredicate={this.itemPredicate}
        disabled={!pairs.length && !existingPairs.length}
      />
    )
  }
}

MultiPairSelector.propTypes = {
  t: PropTypes.func.isRequired,
  togglePair: PropTypes.func.isRequired,
  pairs: PropTypes.arrayOf(PropTypes.string),
  inactivePairs: PropTypes.arrayOf(PropTypes.string),
  existingPairs: PropTypes.arrayOf(PropTypes.string),
  currentFilters: PropTypes.arrayOf(PropTypes.string),
}

MultiPairSelector.defaultProps = {
  pairs: [],
  existingPairs: [],
  inactivePairs: [],
  currentFilters: [],
}

export default MultiPairSelector
