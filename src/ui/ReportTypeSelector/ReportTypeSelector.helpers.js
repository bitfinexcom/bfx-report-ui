import React from 'react'

import constants from './constants'
import Item from './ReportTypeSelector.item'

const { WIN_LOSS, GAINS_DEPOSITS, GAINS_BALANCE } = constants

export const winLossItems = [
  { value: WIN_LOSS, label: <Item type={WIN_LOSS} /> },
  { value: GAINS_DEPOSITS, label: <Item type={GAINS_DEPOSITS} showIcon /> },
  { value: GAINS_BALANCE, label: <Item type={GAINS_BALANCE} showIcon /> },
]
