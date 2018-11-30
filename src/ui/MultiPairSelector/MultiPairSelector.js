import React, { PureComponent } from 'react'
import { injectIntl } from 'react-intl'
import {
  Intent,
  MenuItem,
} from '@blueprintjs/core'
import { MultiSelect } from '@blueprintjs/select'

import { formatPair } from 'state/symbols/utils'

import { propTypes, defaultProps } from './MultiPairSelector.props'

class MultiPairSelector extends PureComponent {
  render() {
    const {
      currentFilters,
      existingPairs,
      handleTagRemove,
      intl,
      onPairSelect,
      pairs,
    } = this.props

    const renderPair = (pair, { modifiers }) => {
      if (!modifiers.matchesPredicate) {
        return null
      }
      const isCurrent = currentFilters.includes(pair)
      const className = existingPairs.includes(pair) && !isCurrent
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
    const renderTag = pair => formatPair(pair)

    return (
      <MultiSelect
        className='bitfinex-multi-select'
        disabled={pairs.length === 0}
        placeholder={intl.formatMessage({ id: 'selector.pair.filter' })}
        items={pairs || existingPairs}
        itemRenderer={renderPair}
        itemPredicate={filterPair}
        onItemSelect={onPairSelect}
        popoverProps={{ minimal: true }}
        tagInputProps={{ tagProps: { minimal: true }, onRemove: handleTagRemove }}
        tagRenderer={renderTag}
        selectedItems={currentFilters}
      />
    )
  }
}

MultiPairSelector.propTypes = propTypes
MultiPairSelector.defaultProps = defaultProps

export default injectIntl(MultiPairSelector)
