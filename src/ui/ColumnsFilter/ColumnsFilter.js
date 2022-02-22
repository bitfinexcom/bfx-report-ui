import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'
import classNames from 'classnames'
import {
  Intent,
  Button,
  InputGroup,
} from '@blueprintjs/core'
import _isEqual from 'lodash/isEqual'
import _isString from 'lodash/isString'

import Icon from 'icons'
import DateInput from 'ui/DateInput'
import DATA_TYPES from 'var/dataTypes'
import ColumnsSelect from 'ui/ColumnsSelect'
import { EMPTY_FILTER } from 'var/filterTypes'
import { selectTextOnFocus } from 'utils/inputs'
import { getValidSortedFilters } from 'state/filters/utils'
import DEFAULT_FILTERS from 'ui/ColumnsFilter/var/defaultFilters'

import ColumnsFilterDialog from './Dialog'
import ColumnSelector from './ColumnSelector'
import SideSelector from './Selectors/SideSelector'
import FilterTypeSelector from './FilterTypeSelector'
import WalletSelector from './Selectors/WalletSelector'
import { FILTERS_SELECTOR } from './ColumnSelector/ColumnSelector.columns'

const MAX_FILTERS = 7
const { DATE } = DATA_TYPES

/* eslint-disable react/no-array-index-key */
class ColumnsFilter extends PureComponent {
  static propTypes = {
    t: PropTypes.func.isRequired,
    target: PropTypes.string.isRequired,
    setFilters: PropTypes.func.isRequired,
    filters: PropTypes.arrayOf(PropTypes.object),
  }

  static defaultProps = {
    filters: [],
  }

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
      value: _isString(filter.value)
        ? filter.value.trim()
        : filter.value,
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

  onDateChange = (index, date) => {
    this.updateFilter({ index, value: +date })
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

  renderSelect = ({ filter, index }) => {
    const { select, value } = filter
    // eslint-disable-next-line no-unused-vars
    const selectProps = {
      className: 'columns-filter-item-input columns-filter-item-input--select',
      value,
      onChange: itemValue => this.onSelectChange(index, itemValue),
    }

    switch (select) {
      case FILTERS_SELECTOR.SIDE:
        return <SideSelector {...selectProps} />
      case FILTERS_SELECTOR.WALLET:
        return <WalletSelector {...selectProps} />
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
      <>
        <div className='columns-filter-wrapper'>
          <Button
            intent={Intent.PRIMARY}
            className={buttonClasses}
            onClick={this.toggleDialog}
          >
            {t('columnsfilter.title')}
          </Button>
        </div>

        <ColumnsFilterDialog
          isOpen={isOpen}
          onClear={this.onClear}
          hasChanges={hasChanges}
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
                      value={column}
                      section={target}
                      onChange={(column) => this.onColumnChange({ index, ...column })}
                    />
                    <FilterTypeSelector
                      value={type}
                      dataType={dataType}
                      isSelect={!!select}
                      onChange={filterType => this.updateFilter({ index, type: filterType })}
                    />
                    {select && this.renderSelect({ filter, index })}
                    {dataType !== DATE && !select && (
                      <InputGroup
                        value={value}
                        onFocus={selectTextOnFocus}
                        className='columns-filter-item-input'
                        onChange={e => this.onInputChange(index, e)}
                      />
                    )}
                    {dataType === DATE && (
                      <DateInput
                        defaultValue={value || null}
                        className='columns-filter-item-input'
                        onChange={e => this.onDateChange(index, e)}
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
                <span
                  onClick={this.onFilterAdd}
                  className='columns-filter-controls-add color--active'
                >
                  {`+ ${t('preferences.sync.add-filter')}`}
                </span>
              )}
              <ColumnsSelect target={target} />
            </div>
          </div>
        </ColumnsFilterDialog>
      </>
    )
  }
}

export default withTranslation('translations')(ColumnsFilter)
