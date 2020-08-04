import React, { Fragment } from 'react'
import classNames from 'classnames'

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

export const formatThousands = (value) => {
  const parts = value.toString().split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return parts.join('.')
}

// formats a number to a specified fraction or a min fraction with a room to grow without rounding
export const formatFraction = (value, options = {}) => {
  if (!value) {
    return value
  }
  const {
    digits = 8,
    minDigits = false,
  } = options
  if (minDigits) {
    const fractionLength = value.toString().split('.')[1].length || 0
    if (fractionLength < minDigits) {
      return fixedFloat(value, minDigits)
    }
    return value
  }
  return fixedFloat(value, digits)
}

export const formatAmount = (val, options = {}) => {
  if (!val) {
    return (
      <Fragment>
        <div className='bitfinex-amount'>
          {val}
        </div>
      </Fragment>
    )
  }
  const {
    color,
    digits = 8,
    minDigits = false,
    fixFraction = true,
    formatThousands: shouldFormatThousands = false,
    dollarSign = false,
  } = options

  const classes = classNames('bitfinex-amount', {
    'bitfinex-green-text': color ? color === 'green' : val > 0,
    'bitfinex-red-text': color ? color === 'red' : val < 0,
  })

  if (fixFraction) {
    val = formatFraction(val, { digits, minDigits }) // eslint-disable-line no-param-reassign
  }

  if (shouldFormatThousands) {
    val = formatThousands(val) // eslint-disable-line no-param-reassign
  }

  const [integer, fraction] = val.toString().split('.')

  return (
    <Fragment>
      <div className={classes}>
        <span>
          {dollarSign && '$'}
          {integer}
        </span>
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
  formatFraction,
  formatThousands,
  amountStyle,
  filterSelectorItem,
}
