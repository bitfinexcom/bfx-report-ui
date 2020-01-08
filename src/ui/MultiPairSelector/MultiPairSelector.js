import React, { PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import {
  Intent,
  MenuItem,
} from '@blueprintjs/core'
import { MultiSelect } from '@blueprintjs/select'

import { propTypes, defaultProps } from './MultiPairSelector.props'

class MultiPairSelector extends PureComponent {
  filterPair = (query, pair) => pair.toUpperCase().indexOf(query.toUpperCase()) >= 0

  renderTag = pair => pair

  renderPair = (pair, { modifiers, handleClick }) => {
    const { active, disabled, matchesPredicate } = modifiers
    if (!matchesPredicate) {
      return null
    }
    const { currentFilters, existingPairs } = this.props
    const isCurrent = currentFilters.includes(pair)
    const className = existingPairs.includes(pair) && !isCurrent && !active
      ? 'bitfinex-queried-symbol' : ''

    return (
      <MenuItem
        className={className}
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
      t,
    } = this.props

    const items = pairs.length
      ? pairs
      : existingPairs

    return (
      <MultiSelect
        className='bitfinex-multi-select'
        disabled={!pairs.length && !existingPairs.length}
        placeholder={t('selector.filter.pair')}
        items={items}
        itemRenderer={this.renderPair}
        itemPredicate={this.filterPair}
        onItemSelect={togglePair}
        popoverProps={{ minimal: true }}
        tagInputProps={{
          tagProps: { minimal: true },
          onRemove: togglePair,
        }}
        tagRenderer={this.renderTag}
        selectedItems={currentFilters}
        resetOnSelect
      />
    )
  }
}

MultiPairSelector.propTypes = propTypes
MultiPairSelector.defaultProps = defaultProps

export default withTranslation('translations')(MultiPairSelector)
