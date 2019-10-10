import React, { PureComponent, Fragment } from 'react'
import { withTranslation } from 'react-i18next'
import { Button, InputGroup, Icon } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'

import ColumnsFilterDialog from './Dialog'
import ColumnSelector from './ColumnSelector'
import FilterTypeSelector from './FilterTypeSelector'
import { propTypes, defaultProps } from './ColumnsFilter.props'

const EMPTY_FILTER = { column: '', type: '', value: '' }

const DEFAULT_FILTERS = [
  { column: 'balance', type: '$gt', value: '1000' },
  EMPTY_FILTER,
  EMPTY_FILTER,
]

/* eslint-disable react/no-array-index-key */
class ColumnsFilter extends PureComponent {
  constructor(props) {
    super()

    const { filters } = props
    this.state = {
      isOpen: true,
      filters: this.getDefaultFilters(filters),
    }
  }

  getDefaultFilters = filters => (filters.length ? filters : DEFAULT_FILTERS)

  toggleDialog = () => {
    const { isOpen } = this.state
    this.setState({ isOpen: !isOpen })
  }

  onCancel = () => {
    const { filters } = this.props

    this.toggleDialog()
    this.setState({
      filters: this.getDefaultFilters(filters),
    })
  }

  onFiltersApply = () => {
    const { filters } = this.state
    const { target, setFilters } = this.props

    this.toggleDialog()
    setFilters({
      section: target,
      filters,
    })
  }

  onFilterAdd = () => {
    const { filters } = this.state
    this.setState({
      filters: filters.concat(EMPTY_FILTER),
    })
  }

  onFilterRemove = (index) => {
    const { filters } = this.state

    this.setState({
      filters: filters.filter((el, i) => i !== index),
    })
  }

  updateFilter = (params) => {
    const { index, ...filterParams } = params
    const { filters } = this.state

    const updatedFilters = filters.map((filter, i) => {
      if (i === index) {
        return {
          ...filter,
          ...filterParams,
        }
      }

      return filter
    })

    this.setState({
      filters: updatedFilters,
    })
  }

  onInputChange = (index, e) => {
    const { value } = e.target
    this.updateFilter({ index, value })
  }

  /* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */
  render() {
    const { target, t } = this.props
    const { isOpen, filters } = this.state

    const hasChanges = true

    return (
      <Fragment>
        <Button onClick={this.toggleDialog}>
          {t('columnsfilter.title')}
        </Button>

        <ColumnsFilterDialog
          isOpen={isOpen}
          hasChanges={hasChanges}
          onCancel={this.onCancel}
          onFiltersApply={this.onFiltersApply}
        >
          <div className='columns-filter'>
            <div>
              {filters.map((filter, index) => {
                const { column, type, value } = filter

                return (
                  <div key={index} className='columns-filter-item'>
                    <ColumnSelector
                      section={target}
                      value={column}
                      onChange={col => this.updateFilter({ index, column: col })}
                    />
                    <FilterTypeSelector
                      value={type}
                      onChange={filterType => this.updateFilter({ index, type: filterType })}
                    />
                    <InputGroup
                      className='columns-filter-item-input'
                      value={value}
                      onChange={e => this.onInputChange(index, e)}
                    />
                    <Icon
                      className='columns-filter-item-remove'
                      icon={IconNames.SMALL_CROSS}
                      onClick={() => this.onFilterRemove(index)}
                    />
                  </div>
                )
              })}
            </div>

            <div className='columns-filter-add' onClick={this.onFilterAdd}>
              {'+ add filter'}
            </div>
          </div>
        </ColumnsFilterDialog>
      </Fragment>
    )
  }
}

ColumnsFilter.propTypes = propTypes
ColumnsFilter.defaultProps = defaultProps

export default withTranslation('translations')(ColumnsFilter)
