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

export const amountStyle = (amount) => {
  const val = parseFloat(amount)
  return classNames('bitfinex-text-align-right', {
    'bitfinex-green-text': val > 0,
    'bitfinex-red-text': val < 0,
  })
}

export const insertIf = (condition, ...elements) => (condition ? elements : [])

export const filterSelectorItem = (query, item) => item.toLowerCase().indexOf(query.toLowerCase()) >= 0

export const fixedFloat = (val, num = 8) => (typeof val === 'number' ? val && val.toFixed(num) : val)

export const formatAmount = (val, color, digits = 8) => {
  if (!val) {
    return (
      <Fragment>
        <div className='bitfinex-amount'>
          {val}
        </div>
      </Fragment>
    )
  }

  const [integer, fraction] = val.toFixed(digits).split('.')
  const classes = classNames('bitfinex-amount', {
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
  dialogDescStyle,
  dialogFieldStyle,
  filterSelectorItem,
}
