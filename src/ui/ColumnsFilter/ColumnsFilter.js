import React, { PureComponent, Fragment } from 'react'
import { withTranslation } from 'react-i18next'
import { Button } from '@blueprintjs/core'

import ColumnsFilterDialog from './Dialog'
import { propTypes, defaultProps } from './ColumnsFilter.props'

import ColumnSelector from './ColumnSelector'
import FilterTypeSelector from './FilterTypeSelector'

const EMPTY_FILTER = { column: '', type: '', value: '' }

const DEFAULT_FILTERS = [
  EMPTY_FILTER,
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
      filters: filters.length
        ? filters
        : DEFAULT_FILTERS,
    }
  }

  toggleDialog = () => {
    const { isOpen } = this.state
    this.setState({ isOpen: !isOpen })
  }

  onCancel = () => {
    this.toggleDialog()
  }

  onFiltersApply = () => {
    this.toggleDialog()
  }

  onFilterAdd = () => {
    const { filters } = this.state
    this.setState({
      filters: filters.concat(EMPTY_FILTER),
    })
  }

  onColumnChange = (index, column) => {
    const { filters } = this.state

    const updatedFilters = filters.map((filter, i) => {
      if (i === index) {
        return {
          ...filter,
          column,
        }
      }

      return filter
    })

    this.setState({
      filters: updatedFilters,
    })
  }

  onFilterTypeChange = () => {
    //
  }

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
                      onChange={col => this.onColumnChange(index, col)}
                    />
                    <FilterTypeSelector value={type} onChange={() => this.onFilterTypeChange(column)} />
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
