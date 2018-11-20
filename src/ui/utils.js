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

export const amoutStyle = (amount) => {
  const val = parseFloat(amount)
  return classNames('bitfinex-text-align-right', {
    'bitfinex-green-text': val > 0,
    'bitfinex-red-text': val < 0,
  })
}

export default {
  amoutStyle,
  dialogDescStyle,
  dialogFieldStyle,
  dialogSmallDescStyle,
}
