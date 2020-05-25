import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'
import { Intent, MenuItem } from '@blueprintjs/core'

import MultiSelect from 'ui/MultiSelect'
import { filterSelectorItem } from 'ui/utils'
import { EXPORT_TARGETS } from 'state/query/utils'
import classNames from 'classnames'

class ExportDialogTargetsSelector extends PureComponent {
  renderTag = (item) => {
    const { t } = this.props
    return t(`${item}.title`)
  }

  renderTarget = (item, { modifiers, handleClick }) => {
    if (!modifiers.matchesPredicate) {
      return null
    }
    const { currentTargets } = this.props
    const isCurrent = currentTargets.includes(item)

    const classes = classNames({
      'bp3-menu-item--selected': isCurrent,
    })

    return (
      <MenuItem
        active={modifiers.active}
        className={classes}
        intent={isCurrent ? Intent.PRIMARY : Intent.NONE}
        disabled={modifiers.disabled}
        key={item}
        onClick={handleClick}
        text={this.renderTag(item)}
      />
    )
  }

  render() {
    const { currentTargets, toggleTarget } = this.props

    return (
      <MultiSelect
        className='bitfinex-select'
        items={EXPORT_TARGETS}
        itemRenderer={this.renderTarget}
        itemPredicate={filterSelectorItem}
        onItemSelect={toggleTarget}
        tagInputProps={{
          tagProps: { minimal: true },
          onRemove: (target, index) => toggleTarget(currentTargets[index]),
        }}
        tagRenderer={this.renderTag}
        selectedItems={currentTargets}
      />
    )
  }
}

ExportDialogTargetsSelector.propTypes = {
  currentTargets: PropTypes.arrayOf(PropTypes.string),
  toggleTarget: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}
ExportDialogTargetsSelector.defaultProps = {
  currentTargets: [],
}

export default withTranslation('translations')(ExportDialogTargetsSelector)
