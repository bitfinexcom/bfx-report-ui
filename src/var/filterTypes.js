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

export const ARRAY_FILTERS = [
  FILTER_TYPES.IS_NULL,
  FILTER_TYPES.IS_NOT_NULL,
]

export default FILTER_TYPES
