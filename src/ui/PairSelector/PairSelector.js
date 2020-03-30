import React, { PureComponent } from 'react'
import {
  Button,
  Intent,
  MenuItem,
} from '@blueprintjs/core'
import { Select } from '@blueprintjs/select'
import { IconNames } from '@blueprintjs/icons'

import { filterSelectorItem } from 'ui/utils'

import { propTypes, defaultProps } from './PairSelector.props'

class PairSelector extends PureComponent {
  renderPair = (pair, { modifiers, handleClick }) => {
    const { active, disabled, matchesPredicate } = modifiers
    if (!matchesPredicate) {
      return null
    }
    const { currentPair } = this.props
    const isCurrent = currentPair === pair

    return (
      <MenuItem
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
      currentPair, pairs, onPairSelect, buttonClassName,
    } = this.props

    return (
      <Select
        className='bitfinex-select'
        disabled={!pairs.length}
        items={pairs}
        itemRenderer={this.renderPair}
        itemPredicate={filterSelectorItem}
        onItemSelect={onPairSelect}
        popoverProps={{
          minimal: true,
          popoverClassName: 'bitfinex-select-menu',
        }}
      >
        <Button
          text={currentPair}
          className={buttonClassName}
          rightIcon={IconNames.CARET_DOWN}
          disabled={!pairs.length}
        />
      </Select>
    )
  }
}

PairSelector.propTypes = propTypes
PairSelector.defaultProps = defaultProps

export default PairSelector
