import React from 'react'
import ReactDOM from 'react-dom'
import {
  renderWithIntl,
  rendererCreateWithIntl,
  shallowWithIntl,
} from 'tests/helper'
import Movements from '../Movements'

const NO_ENTRY = []
const ENTRIES = [
  {
    id: 10450678,
    currency: 'USD',
    currencyName: 'WIRE',
    mtsStarted: 1530801307000,
    mtsUpdated: 1530804653000,
    status: 'COMPLETED',
    amount: 1234,
    fees: 0,
    destinationAddress: null,
    transactionId: null,
  },
  {
    id: 10450289,
    currency: 'ETH',
    currencyName: 'ETHEREUM',
    mtsStarted: 1527418430000,
    mtsUpdated: 1527418789000,
    status: 'COMPLETED',
    amount: 12.3,
    fees: 0,
    destinationAddress: '0x1234c77b33444514babcded17ee0f6197f0e3ff4',
    transactionId: '0xb62d0ca12fad7294ec1234c611233bea66e4b37d0e4a101bf7a4dfd06cf8261c',
  },
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
  shallowWithIntl(<Movements type='deposits' loading={false} entries={ENTRIES} />)
})

test('withdrawals renders without crashing with data', () => {
  shallowWithIntl(<Movements type='withdrawals' loading={false} entries={ENTRIES} />)
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
