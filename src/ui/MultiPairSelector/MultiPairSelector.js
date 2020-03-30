import React, { PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import classNames from 'classnames'
import {
  Intent,
  MenuItem,
} from '@blueprintjs/core'
import { MultiSelect } from '@blueprintjs/select'

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
      t,
    } = this.props

    const items = pairs.length
      ? pairs
      : existingPairs

    return (
      <MultiSelect
        className='bitfinex-select'
        disabled={!pairs.length && !existingPairs.length}
        placeholder={t('selector.select')}
        items={items}
        itemRenderer={this.renderPair}
        itemPredicate={filterSelectorItem}
        onItemSelect={togglePair}
        popoverProps={{
          minimal: true,
          popoverClassName: 'bitfinex-select-menu',
        }}
        tagInputProps={{
          tagProps: { minimal: true },
          onRemove: togglePair,
        }}
        tagRenderer={pair => pair}
        selectedItems={currentFilters}
        resetOnSelect
      />
    )
  }
}

MultiPairSelector.propTypes = propTypes
MultiPairSelector.defaultProps = defaultProps

export default withTranslation('translations')(MultiPairSelector)
