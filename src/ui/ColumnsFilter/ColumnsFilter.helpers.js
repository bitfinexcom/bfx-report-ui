import _size from 'lodash/size'
import _filter from 'lodash/filter'
import _isEmpty from 'lodash/isEmpty'
import _toString from 'lodash/toString'

export const getFiltersTitle = (filters, t) => {
  if (_size(filters) > 0) {
    const activeFilters = _filter(filters, filter => {
      const { value = '' } = filter
      return !_isEmpty(_toString(value))
    })

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
}
