import React, { PureComponent, Fragment } from 'react'
import { withTranslation } from 'react-i18next'
import classNames from 'classnames'
import {
  Button,
  InputGroup,
  Intent,
} from '@blueprintjs/core'
import _isEqual from 'lodash/isEqual'

import ColumnsSelect from 'ui/ColumnsSelect'
import Icon from 'icons'
import { selectTextOnFocus } from 'utils/inputs'
import { getValidSortedFilters } from 'state/filters/utils'
import { EMPTY_FILTER } from 'var/filterTypes'
import DEFAULT_FILTERS from 'ui/ColumnsFilter/var/defaultFilters'

import ColumnsFilterDialog from './Dialog'
import ColumnSelector from './ColumnSelector'
import FilterTypeSelector from './FilterTypeSelector'
import { propTypes, defaultProps } from './ColumnsFilter.props'
// import { FILTERS_SELECTOR } from './ColumnSelector/ColumnSelector.columns'

const MAX_FILTERS = 7

/* eslint-disable react/no-array-index-key */
class ColumnsFilter extends PureComponent {
  constructor(props) {
    super()

    const { filters } = props
    this.state = {
      isOpen: false,
      filters,
    }
  }

  toggleDialog = () => {
    const { isOpen } = this.state
    this.setState({ isOpen: !isOpen })
  }

  onClear = () => {
    const { target } = this.props

    this.setState({
      filters: DEFAULT_FILTERS[target],
    })
  }

  onCancel = () => {
    const { filters } = this.props

    this.toggleDialog()
    this.setState({
      filters,
    })
  }

  onFiltersApply = () => {
    const { filters } = this.state
    const { target, setFilters } = this.props

    const trimmedFilters = filters.map(filter => ({
      ...filter,
      value: filter.value.trim(),
    }))

    this.toggleDialog()
    setFilters({
      section: target,
      filters: trimmedFilters,
    })

    this.setState({
      filters: trimmedFilters,
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

    // last filter removal
    if (filters.length === 1) {
      this.setState({
        filters: [EMPTY_FILTER],
      })
      return
    }

    this.setState({
      filters: filters.filter((el, i) => i !== index),
    })
  }

  onColumnChange = (params) => {
    const { index, ...filterParams } = params
    const { filters } = this.state

    const updatedFilters = filters.map((filter, i) => {
      if (i === index) {
        return {
          type: '',
          value: '',
          ...filterParams,
        }
      }

      return filter
    })

    this.setState({
      filters: updatedFilters,
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

  onSelectChange = (index, value) => {
    this.updateFilter({ index, value })
  }

  haveFiltersChanged = () => {
    const { filters: currentFilters } = this.props
    const { filters } = this.state

    const currentValidFilters = getValidSortedFilters(currentFilters)
    const nextValidFilters = getValidSortedFilters(filters)

    const hasFilterValueChanged = nextValidFilters
      .some((filter, index) => !_isEqual(filter, currentValidFilters[index]))

    return currentValidFilters.length !== nextValidFilters.length || hasFilterValueChanged
  }

  // TODO: add selectors for respective filters (e.g. side)
  renderSelect = ({ filter, index }) => {
    const { select, value } = filter
    // eslint-disable-next-line no-unused-vars
    const selectProps = {
      className: 'columns-filter-item-input columns-filter-item-input--select',
      value,
      onChange: itemValue => this.onSelectChange(index, itemValue),
    }

    switch (select) {
      default:
        return null
    }
  }

  /* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events, no-shadow */
  render() {
    const { target, filters: currentFilters, t } = this.props
    const { isOpen, filters } = this.state

    const hasChanges = this.haveFiltersChanged()
    const hasAppliedFilters = currentFilters.some(filter => filter.value)
    const buttonClasses = classNames('button--large', { 'columns-filter--active': hasAppliedFilters })

    return (
      <Fragment>
        <div className='columns-filter-wrapper'>
          <Button
            onClick={this.toggleDialog}
            className={buttonClasses}
            intent={Intent.PRIMARY}
          >
            {t('columnsfilter.title')}
          </Button>
        </div>

        <ColumnsFilterDialog
          isOpen={isOpen}
          hasChanges={hasChanges}
          onClear={this.onClear}
          onCancel={this.onCancel}
          onFiltersApply={this.onFiltersApply}
        >
          <div className='columns-filter'>
            <div>
              {filters.map((filter, index) => {
                const {
                  column, type, dataType, select, value,
                } = filter

                return (
                  <div key={`${column}_${index}`} className='columns-filter-item'>
                    <ColumnSelector
                      section={target}
                      value={column}
                      onChange={(column) => this.onColumnChange({ index, ...column, dataType })}
                    />
                    <FilterTypeSelector
                      value={type}
                      dataType={dataType}
                      onChange={filterType => this.updateFilter({ index, type: filterType })}
                    />
                    {select
                      ? this.renderSelect({ filter, index })
                      : (
                        <InputGroup
                          className='columns-filter-item-input'
                          value={value}
                          onChange={e => this.onInputChange(index, e)}
                          onFocus={selectTextOnFocus}
                        />
                      )}
                    <Icon.BIN
                      className='columns-filter-item-remove'
                      onClick={() => this.onFilterRemove(index)}
                    />
                  </div>
                )
              })}
            </div>

            <div className='columns-filter-controls'>
              {(filters.length < MAX_FILTERS) && (
                <span className='columns-filter-controls-add color--active' onClick={this.onFilterAdd}>
                  {`+ ${t('preferences.sync.add-filter')}`}
                </span>
              )}
              <ColumnsSelect target={target} />
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
