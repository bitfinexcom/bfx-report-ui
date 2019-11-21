const FILTER_TYPES = {
  GT: '$gt',
  GTE: '$gte',
  LT: '$lt',
  LTE: '$lte',
  NOT: '$not',
  LIKE: '$like',
  EQ: '$eq',
  NE: '$ne',
  IN: '$in',
  NIN: '$nin',
  IS_NULL: '$isNull',
  IS_NOT_NULL: '$isNotNull',
}

export const EMPTY_FILTER = {
  column: '',
  type: '',
  dataType: '',
  value: '',
}

export const FILTERS = {
  CONTAINS: 'contains',
  BEGINS_WITH: 'begins_with',
  ENDS_WITH: 'ends_with',
  EQUAL_TO: 'equal_to',
  NOT_EQUAL_TO: 'not_equal_to',
  GREATER_THAN: 'greater_than',
  LESS_THAN: 'less_than',
}

export const FILTER_QUERY_TYPES = {
  [FILTERS.CONTAINS]: 'ct',
  [FILTERS.BEGINS_WITH]: 'bw',
  [FILTERS.ENDS_WITH]: 'ew',
  [FILTERS.EQUAL_TO]: 'eq',
  [FILTERS.NOT_EQUAL_TO]: 'ne',
  [FILTERS.GREATER_THAN]: 'gt',
  [FILTERS.LESS_THAN]: 'lt',
}

export default FILTER_TYPES
