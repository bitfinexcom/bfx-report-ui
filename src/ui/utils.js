import React, { Fragment } from 'react'
import classNames from 'classnames'

export const dialogDescStyle = classNames(
  'bitfinex-preferences-desc',
  'bitfinex-text-align-right',
  'col-xs-4',
  'col-sm-4',
  'col-md-4',
  'col-lg-4',
  'col-xl-4',
)

export const dialogFieldStyle = classNames(
  'col-xs-8',
  'col-sm-8',
  'col-md-8',
  'col-lg-8',
  'col-xl-8',
)

export const checkboxFieldStyle = classNames(
  'col-xs-8',
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

export const fixedFloat = val => (typeof val === 'number' ? val && val.toFixed(8) : val)

export const formatAmount = (val, color) => {
  if (!val) {
    return (
      <Fragment>
        <div className='bitfinex-text-align-right'>
          {val}
        </div>
      </Fragment>
    )
  }

  const [integer, fraction] = val.toFixed(8).split('.')
  const classes = classNames('bitfinex-amount bitfinex-text-align-right', {
    'bitfinex-green-text': color ? color === 'green' : val > 0,
    'bitfinex-red-text': color ? color === 'red' : val < 0,
  })

  return (
    <Fragment>
      <div className={classes}>
        <span>{integer}</span>
        {'.'}
        <span className='bitfinex-amount-fraction'>{fraction}</span>
      </div>
    </Fragment>
  )
}

export default {
  fixedFloat,
  insertIf,
  formatAmount,
  amountStyle,
  checkboxFieldStyle,
  dialogDescStyle,
  dialogFieldStyle,
}
