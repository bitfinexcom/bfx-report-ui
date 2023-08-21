import _size from 'lodash/size'
import _filter from 'lodash/filter'
import _isEmpty from 'lodash/isEmpty'

export const getFiltersTitle = (filters, t) => {
  if (_size(filters) > 0) {
    const activeFilters = _filter(filters,
      filter => filter?.value && !_isEmpty(filter?.value))

    return _size(activeFilters) > 0
      ? `${_size(activeFilters)} ${t('columnsfilter.filters.title')}`
      : t('columnsfilter.none')
  }

  return t('columnsfilter.none')
}

export default {
  getFiltersTitle,
}
