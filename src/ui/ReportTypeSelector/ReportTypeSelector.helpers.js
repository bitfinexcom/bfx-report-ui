import React from 'react'

import queryConstants from 'state/query/constants'

import constants from './constants'
import Item from './ReportTypeSelector.item'

const {
  WIN_LOSS,
  GAINS_DEPOSITS,
  GAINS_BALANCE,
  TRADING_FEES,
  FUNDING_FEES,
  FUNDING_TRADING_FEES,
} = constants

const winLossItems = [
  { value: WIN_LOSS, label: <Item type={WIN_LOSS} /> },
  { value: GAINS_DEPOSITS, label: <Item type={GAINS_DEPOSITS} showIcon /> },
  { value: GAINS_BALANCE, label: <Item type={GAINS_BALANCE} showIcon /> },
]

const feesItems = [
  { value: TRADING_FEES, label: <Item type={TRADING_FEES} /> },
  { value: FUNDING_FEES, label: <Item type={FUNDING_FEES} /> },
  { value: FUNDING_TRADING_FEES, label: <Item type={FUNDING_TRADING_FEES} /> },
]

export const getItems = (section) => {
  switch (section) {
    case queryConstants.MENU_WIN_LOSS:
      return winLossItems
    case queryConstants.MENU_FEES_REPORT:
      return feesItems
    default:
      return []
  }
}
