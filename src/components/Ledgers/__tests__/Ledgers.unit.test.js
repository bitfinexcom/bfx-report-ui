import React from 'react'
import ReactDOM from 'react-dom'
import {
  renderWithIntl,
  rendererCreateWithIntl,
} from 'tests/helper'
import Ledgers from '../Ledgers'

const NO_ENTRY = []
const ENTRIES = [
  {
    id: 131999912,
    currency: 'USD',
    mts: 1531877402000,
    amount: 11.80615938,
    balance: 5579.34669128,
    description: 'Margin Funding Payment on wallet funding',
  },
  {
    id: 131999497,
    currency: 'USD',
    mts: 1531791000000,
    amount: 11.4774085,
    balance: 5567.5405319,
    description: 'Margin Funding Payment on wallet funding',
  },
  {
    id: 131999278,
    currency: 'USD',
    mts: 1531704601000,
    amount: 10.57938853,
    balance: 5556.0631234,
    description: 'Margin Funding Payment on wallet funding',
  },
  {
    id: 131999082,
    currency: 'USD',
    mts: 1531618201000,
    amount: 8.0626265,
    balance: 5545.48373487,
    description: 'Margin Funding Payment on wallet funding',
  },
  {
    id: 131999018,
    currency: 'USD',
    mts: 1531531802000,
    amount: 5.22812481,
    balance: 5537.42110837,
    description: 'Margin Funding Payment on wallet funding',
  },
  {
    id: 131997048,
    currency: 'ETH',
    mts: 1530814083000,
    amount: -0.00090909,
    balance: 54.42784694,
    description: 'Trading fees for 0.90909091 ETH (ETHBTC) @ 1.075 on BFX (0.1%) on wallet exchange',
  },
  {
    id: 131997047,
    currency: 'ETH',
    mts: 1530814083000,
    amount: -0.001,
    balance: 54.42875603,
    description: 'Trading fees for 1.0 ETH (ETHBTC) @ 1.075 on BFX (0.1%) on wallet exchange',
  },
]

test('renders without crashing', () => {
  const div = document.createElement('div')
  renderWithIntl(<Ledgers />, div)
  ReactDOM.unmountComponentAtNode(div)
})

test('renders without crashing with data', () => {
  const div = document.createElement('div')
  renderWithIntl(<Ledgers loading={false} entries={ENTRIES} />, div)
  ReactDOM.unmountComponentAtNode(div)
})

test('render loading correctly', () => {
  const component = rendererCreateWithIntl(<Ledgers />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('render no data correctly', () => {
  const component = rendererCreateWithIntl(<Ledgers loading={false} entries={NO_ENTRY} />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

// test('render correctly with data', () => {
//   const component = rendererCreateWithIntl(<Ledgers loading={false} entries={ENTRIES} />)
//   const tree = component.toJSON()
//   expect(tree).toMatchSnapshot()
// })
