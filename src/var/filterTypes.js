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

export const ARRAY_FILTERS = [
  FILTER_TYPES.IS_NULL,
  FILTER_TYPES.IS_NOT_NULL,
]

export const FILTERS = {
  CONTAINS: 'contains',
  BEGINS_WITH: 'begins_with',
  ENDS_WITH: 'ends_with',
  EQUAL_TO: 'equal_to',
  NOT_EQUAL_TO: 'not_equal_to',
  GREATER_THAN: 'greater_than',
  LESS_THAN: 'less_than',
}

export default FILTER_TYPES
