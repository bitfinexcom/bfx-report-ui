import React, { PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import {
  Intent,
  MenuItem,
} from '@blueprintjs/core'
import { MultiSelect } from '@blueprintjs/select'

import { formatPair } from 'state/symbols/utils'

import { propTypes, defaultProps } from './MultiPairSelector.props'

class MultiPairSelector extends PureComponent {
  filterPair = (query, pair) => pair.indexOf(query.toUpperCase()) >= 0

  renderTag = pair => formatPair(pair)

  renderPair = (pair, { modifiers }) => {
    if (!modifiers.matchesPredicate) {
      return null
    }
    const { currentFilters, existingPairs } = this.props
    const isCurrent = currentFilters.map(currentPair => currentPair.replace(':', '/')).includes(pair)
    const className = existingPairs.includes(pair) && !isCurrent
      ? 'bitfinex-queried-symbol' : ''

    return (
      <MenuItem
        className={className}
        active={modifiers.active}
        intent={isCurrent ? Intent.PRIMARY : Intent.NONE}
        disabled={modifiers.disabled}
        key={pair}
        onClick={() => this.togglePair(pair)}
        text={pair}
      />
    )
  }

  togglePair = (pair) => {
    const { togglePair } = this.props

    togglePair(pair.replace('/', ':'))
  }

  render() {
    const {
      currentFilters,
      existingPairs,
      pairs,
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
        onItemSelect={this.togglePair}
        popoverProps={{ minimal: true }}
        tagInputProps={{
          tagProps: { minimal: true },
          onRemove: this.togglePair,
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
