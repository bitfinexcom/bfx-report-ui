import React, { PureComponent } from 'react'
import { injectIntl } from 'react-intl'
import {
  Intent,
  MenuItem,
} from '@blueprintjs/core'
import { MultiSelect } from '@blueprintjs/select'

import { getFilterType } from 'state/query/utils'

import { propTypes, defaultProps } from './MultiSymbolSelector.props'

class MultiSymbolSelector extends PureComponent {
  render() {
    const {
      coins,
      currencies,
      currentFilters,
      existingCoins,
      handleTagRemove,
      intl,
      onSymbolSelect,
      type,
    } = this.props

    const renderSymbol = (symbol, { modifiers }) => {
      if (!modifiers.matchesPredicate) {
        return null
      }
      const isCurrent = currentFilters.includes(symbol)
      const className = existingCoins.includes(symbol) && !isCurrent
        ? 'bitfinex-queried-symbol' : ''

      return (
        <MenuItem
          className={className}
          active={modifiers.active}
          intent={isCurrent ? Intent.PRIMARY : Intent.NONE}
          disabled={modifiers.disabled}
          key={symbol}
          onClick={onSymbolSelect(symbol)}
          text={symbol}
          label={currencies[symbol]}
        />
      )
    }

    const filterSymbol = (query, coin) => coin.toLowerCase().indexOf(query.toLowerCase()) >= 0
    const renderTag = coin => coin

    const title = `selector.${getFilterType(type)}.filter`
    return (
      <MultiSelect
        className='bitfinex-multi-select'
        disabled={coins.length === 0}
        placeholder={intl.formatMessage({ id: title })}
        items={coins || existingCoins}
        itemRenderer={renderSymbol}
        itemPredicate={filterSymbol}
        onItemSelect={onSymbolSelect}
        popoverProps={{ minimal: true }}
        tagInputProps={{ tagProps: { minimal: true }, onRemove: handleTagRemove }}
        tagRenderer={renderTag}
        selectedItems={currentFilters}
        resetOnSelect
      />
    )
  }
}

MultiSymbolSelector.propTypes = propTypes
MultiSymbolSelector.defaultProps = defaultProps

export default injectIntl(MultiSymbolSelector)
