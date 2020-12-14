import React, { PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import { Intent, MenuItem } from '@blueprintjs/core'

import Select from 'ui/Select'

import { propTypes, defaultProps } from './PairSelector.props'

class PairSelector extends PureComponent {
  itemRenderer = (pair, { modifiers, handleClick }) => {
    const { active, disabled, matchesPredicate } = modifiers
    if (!matchesPredicate) {
      return null
    }
    const { currentPair, t } = this.props
    const isCurrent = currentPair === pair
    const text = pair === 'inactive' ? t('selector.inactive') : pair

    return (
      <MenuItem
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
      currentPair, inactivePairs, pairs, onPairSelect,
    } = this.props

    const items = inactivePairs.length
      ? [
        ...pairs,
        'inactive',
        ...inactivePairs,
      ]
      : pairs

    return (
      <Select
        popoverClassName='bitfinex-select-menu--pair'
        itemRenderer={this.itemRenderer}
        itemPredicate={this.itemPredicate}
        onChange={onPairSelect}
        filterable
        items={items}
        value={currentPair}
      />
    )
  }
}

PairSelector.propTypes = propTypes
PairSelector.defaultProps = defaultProps

export default withTranslation('translations')(PairSelector)
