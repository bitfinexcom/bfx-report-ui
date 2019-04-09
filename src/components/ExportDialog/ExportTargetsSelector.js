import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'
import { MenuItem } from '@blueprintjs/core'
import { MultiSelect } from '@blueprintjs/select'

import { ORDERED_TARGETS } from 'state/query/utils'

class ExportTargetsSelector extends PureComponent {
  componentDidMount() {
    const {
      target,
      onTargetSelect,
    } = this.props
    // put current dataset into currentTargets
    onTargetSelect(target)()
  }

  render() {
    const {
      currentTargets,
      handleTagRemove,
      onTargetSelect,
      t,
    } = this.props

    const renderTarget = (item, { modifiers }) => {
      if (!modifiers.matchesPredicate) {
        return null
      }

      return (
        <MenuItem
          active={modifiers.active}
          disabled={modifiers.disabled}
          key={item}
          onClick={onTargetSelect(item)}
          text={t(`${item}.title`)}
        />
      )
    }

    const filterTarget = (query, item) => item.toLowerCase().indexOf(query.toLowerCase()) >= 0
    const renderTag = item => t(`${item}.title`)

    return (
      <MultiSelect
        className='bitfinex-multi-select'
        items={ORDERED_TARGETS}
        itemRenderer={renderTarget}
        itemPredicate={filterTarget}
        onItemSelect={onTargetSelect}
        popoverProps={{ minimal: true }}
        tagInputProps={{ tagProps: { minimal: true }, onRemove: handleTagRemove }}
        tagRenderer={renderTag}
        selectedItems={currentTargets}
        resetOnSelect
      />
    )
  }
}

ExportTargetsSelector.propTypes = {
  currentTargets: PropTypes.arrayOf(PropTypes.string),
  handleTagRemove: PropTypes.func.isRequired,
  onTargetSelect: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  target: PropTypes.string.isRequired,
}
ExportTargetsSelector.defaultProps = {
  currentTargets: [],
}

export default withTranslation('translations')(ExportTargetsSelector)
