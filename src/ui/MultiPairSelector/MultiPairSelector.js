import React, { PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import {
  Intent,
  MenuItem,
} from '@blueprintjs/core'
import { MultiSelect } from '@blueprintjs/select'

import { formatPair, parsePairTag } from 'state/symbols/utils'

import { propTypes, defaultProps } from './MultiPairSelector.props'

class MultiPairSelector extends PureComponent {
  filterPair = (query, pair) => pair.indexOf(query.replace('/', '').toUpperCase()) >= 0

  renderTag = pair => formatPair(pair)

  renderPair = (pair, { modifiers }) => {
    if (!modifiers.matchesPredicate) {
      return null
    }
    const { currentFilters, existingPairs, togglePair } = this.props
    const isCurrent = currentFilters.map(currentPair => currentPair.toUpperCase()).includes(pair)
    const className = existingPairs.includes(pair) && !isCurrent
      ? 'bitfinex-queried-symbol' : ''

    return (
      <MenuItem
        className={className}
        active={modifiers.active}
        intent={isCurrent ? Intent.PRIMARY : Intent.NONE}
        disabled={modifiers.disabled}
        key={pair}
        onClick={() => togglePair(pair)}
        text={formatPair(pair)}
      />
    )
  }

  render() {
    const {
      currentFilters,
      existingPairs,
      togglePair,
      pairs,
      t,
    } = this.props

    return (
      <MultiSelect
        className='bitfinex-multi-select'
        disabled={pairs.length === 0}
        placeholder={t('selector.filter.pair')}
        items={pairs || existingPairs}
        itemRenderer={this.renderPair}
        itemPredicate={this.filterPair}
        onItemSelect={togglePair}
        popoverProps={{ minimal: true }}
        tagInputProps={{
          tagProps: { minimal: true },
          onRemove: pair => togglePair(parsePairTag(pair)),
        }}
        tagRenderer={this.renderTag}
        selectedItems={currentFilters.map(pair => pair.toLowerCase())}
        resetOnSelect
      />
    )
  }
}

MultiPairSelector.propTypes = propTypes
MultiPairSelector.defaultProps = defaultProps

export default withTranslation('translations')(MultiPairSelector)
