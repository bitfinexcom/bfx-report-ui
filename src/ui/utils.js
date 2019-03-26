import classNames from 'classnames'

export const dialogDescStyle = classNames(
  'bitfinex-preferences-desc',
  'bitfinex-text-align-right',
  'hidden-xs',
  'col-sm-4',
  'col-md-4',
  'col-lg-4',
  'col-xl-4',
)

export const dialogSmallDescStyle = classNames(
  'col-xs-12',
  'hidden-sm',
  'hidden-md',
  'hidden-lg',
  'hidden-xl',
)

export const dialogFieldStyle = classNames(
  'col-xs-12',
  'col-sm-8',
  'col-md-8',
  'col-lg-8',
  'col-xl-8',
)

export const checkboxFieldStyle = classNames(
  'col-xs-12',
  'col-sm-8',
  'col-md-8',
  'col-lg-8',
  'col-xl-8',
  'bitfinex-pref-checkbox',
)

export const amountStyle = (amount) => {
  const val = parseFloat(amount)
  return classNames('bitfinex-text-align-right', {
    'bitfinex-green-text': val > 0,
    'bitfinex-red-text': val < 0,
  })
}

export const insertIf = (condition, ...elements) => (condition ? elements : [])

export const fixedFloat = val => val && val.toFixed(2)

export default {
  fixedFloat,
  insertIf,
  amountStyle,
  checkboxFieldStyle,
  dialogDescStyle,
  dialogFieldStyle,
  dialogSmallDescStyle,
}
