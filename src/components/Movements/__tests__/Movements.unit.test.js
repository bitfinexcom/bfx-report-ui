import React from 'react'
import ReactDOM from 'react-dom'
import {
  renderWithIntl,
  rendererCreateWithIntl,
} from 'tests/helper'
import Movements from '../Movements'

const NO_ENTRY = []
const ENTRIES = [
  {
    id: 1350463,
    currency: 'ETH',
    currencyName: 'ETHEREUM',
    mtsStarted: 1528251777000,
    mtsUpdated: 1528251998000,
    status: 'PENDING REVIEW',
    amount: -0.9976,
    fees: -0.0024,
    destinationAddress: '0x12345678c3E5833A1664fA7F8A757D226669f3c6',
    transactionId: null,
  },
]

test('deposits renders without crashing', () => {
  const div = document.createElement('div')
  renderWithIntl(<Movements type='deposits' />, div)
  ReactDOM.unmountComponentAtNode(div)
})

test('withdrawals renders without crashing', () => {
  const div = document.createElement('div')
  renderWithIntl(<Movements type='withdrawals' />, div)
  ReactDOM.unmountComponentAtNode(div)
})

test('deposits renders without crashing with data', () => {
  const div = document.createElement('div')
  renderWithIntl(<Movements type='deposits' loading={false} entries={ENTRIES} />, div)
  ReactDOM.unmountComponentAtNode(div)
})

test('withdrawals renders without crashing with data', () => {
  const div = document.createElement('div')
  renderWithIntl(<Movements type='withdrawals' loading={false} entries={ENTRIES} />, div)
  ReactDOM.unmountComponentAtNode(div)
})

test('deposits render loading correctly', () => {
  const component = rendererCreateWithIntl(<Movements type='deposits' />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('withdrawals render loading correctly', () => {
  const component = rendererCreateWithIntl(<Movements type='withdrawals' />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('deposits render no data correctly', () => {
  const component = rendererCreateWithIntl(<Movements type='deposits' loading={false} entries={NO_ENTRY} />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('withdrawals render no data correctly', () => {
  const component = rendererCreateWithIntl(<Movements type='withdrawals' loading={false} entries={NO_ENTRY} />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

// test('deposits render correctly with data', () => {
//   const component = rendererCreateWithIntl(<Movements type='deposits' loading={false} entries={ENTRIES} />)
//   const tree = component.toJSON()
//   expect(tree).toMatchSnapshot()
// })

// test('withdrawals render correctly with data', () => {
//   const component = rendererCreateWithIntl(<Movements type='withdrawals' loading={false} entries={ENTRIES} />)
//   const tree = component.toJSON()
//   expect(tree).toMatchSnapshot()
// })
