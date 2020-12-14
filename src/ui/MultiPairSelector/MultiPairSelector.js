import React, { PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import classNames from 'classnames'
import {
  Intent,
  MenuItem,
} from '@blueprintjs/core'

import MultiSelect from 'ui/MultiSelect'

import { propTypes, defaultProps } from './MultiPairSelector.props'

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
        className={classes}
        active={active}
        intent={isCurrent ? Intent.PRIMARY : Intent.NONE}
        disabled={disabled || pair === 'inactive'}
        key={pair}
        onClick={handleClick}
        text={text}
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
      currentFilters,
      existingPairs,
      inactivePairs,
      pairs,
      togglePair,
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
        disabled={!pairs.length && !existingPairs.length}
        items={items}
        itemRenderer={this.renderPair}
        itemPredicate={this.itemPredicate}
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

export default withTranslation('translations')(MultiPairSelector)
