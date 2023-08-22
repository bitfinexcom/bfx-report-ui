import _size from 'lodash/size'
import _filter from 'lodash/filter'
import _isEmpty from 'lodash/isEmpty'
import _toString from 'lodash/toString'

const getActiveFilters = (filters) => _filter(
  filters, filter => !_isEmpty(_toString(filter?.value ?? '')),
)

export const getFiltersClassNames = (filters) => {
  const activeFilters = getActiveFilters(filters)
  return _size(activeFilters) > 0 ? '' : 'no-filters'
}

export const getFiltersTitle = (filters, t) => {
  if (_size(filters) > 0) {
    const activeFilters = getActiveFilters(filters)
    const filtersTitle = _size(activeFilters) > 1
      ? t('columnsfilter.filters.title')
      : t('columnsfilter.title')

    return _size(activeFilters) > 0
      ? `${_size(activeFilters)} ${filtersTitle}`
      : t('columnsfilter.none')
  }

  return t('columnsfilter.none')
}

export default {
  getFiltersTitle,
  getFiltersClassNames,
}
