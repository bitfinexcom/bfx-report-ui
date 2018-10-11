import React from 'react'
import ReactDOM from 'react-dom'
import {
  renderWithIntl,
  rendererCreateWithIntl,
} from 'tests/helper'
import Orders from '../Orders'

const NO_ENTRY = []
const ENTRIES = [
  {
    id: 1149732382,
    gid: null,
    cid: 53916927769,
    pair: 'BTC/USD',
    mtsCreate: 1529938717000,
    mtsUpdate: 1529941979000,
    amount: 0,
    amountOrig: -0.2,
    amountExecuted: -0.2,
    type: 'EXCHANGE LIMIT',
    typePrev: null,
    flags: '0',
    status: 'EXECUTED @ 18037.0(-0.2)',
    price: 18037,
    priceAvg: 18037,
    priceTrailing: 0,
    priceAuxLimit: 0,
    notify: 0,
    placedId: null,
  },
  {
    id: 1149721794,
    gid: null,
    cid: 10241082294,
    pair: 'BTC/USD',
    mtsCreate: 1529549441000,
    mtsUpdate: 1529576031000,
    amount: 0,
    amountOrig: 0.2,
    amountExecuted: 0.2,
    type: 'EXCHANGE LIMIT',
    typePrev: null,
    flags: '0',
    status: 'EXECUTED @ 16560.0(0.2)',
    price: 16560,
    priceAvg: 16560,
    priceTrailing: 0,
    priceAuxLimit: 0,
    notify: 0,
    placedId: null,
  },
  {
    id: 1149721793,
    gid: null,
    cid: 10230273945,
    pair: 'BTC/USD',
    mtsCreate: 1529549430000,
    mtsUpdate: 1529575757000,
    amount: 0,
    amountOrig: -0.5,
    amountExecuted: -0.5,
    type: 'EXCHANGE LIMIT',
    typePrev: null,
    flags: '0',
    status: 'EXECUTED @ 18061.0(-0.5)',
    price: 18061,
    priceAvg: 18061,
    priceTrailing: 0,
    priceAuxLimit: 0,
    notify: 0,
    placedId: null,
  },
  {
    id: 1149721791,
    gid: null,
    cid: 10212323001,
    pair: 'BTC/USD',
    mtsCreate: 1529549412000,
    mtsUpdate: 1529575721000,
    amount: 0,
    amountOrig: 0.4,
    amountExecuted: 0.4,
    type: 'EXCHANGE LIMIT',
    typePrev: null,
    flags: '0',
    status: 'EXECUTED @ 17410.0(0.4)',
    price: 17410,
    priceAvg: 17410,
    priceTrailing: 0,
    priceAuxLimit: 0,
    notify: 0,
    placedId: null,
  },
  {
    id: 1149717540,
    gid: null,
    cid: 23759415063,
    pair: 'BTC/USD',
    mtsCreate: 1529476559000,
    mtsUpdate: 1529549557000,
    amount: 0.2,
    amountOrig: 0.2,
    amountExecuted: 0.2,
    type: 'EXCHANGE LIMIT',
    typePrev: null,
    flags: '0',
    status: 'CANCELED',
    price: 17410,
    priceAvg: 0,
    priceTrailing: 0,
    priceAuxLimit: 0,
    notify: 0,
    placedId: null,
  },
  {
    id: 1149721792,
    gid: null,
    cid: 10219626687,
    pair: 'BTC/USD',
    mtsCreate: 1529549420000,
    mtsUpdate: 1529549554000,
    amount: -0.07400001,
    amountOrig: -0.07400001,
    amountExecuted: 0,
    type: 'EXCHANGE LIMIT',
    typePrev: null,
    flags: '0',
    status: 'CANCELED',
    price: 18042,
    priceAvg: 0,
    priceTrailing: 0,
    priceAuxLimit: 0,
    notify: 0,
    placedId: null,
  },
  {
    id: 1149717543,
    gid: null,
    cid: 31589172329,
    pair: 'BTC/USD',
    mtsCreate: 1529484389000,
    mtsUpdate: 1529549265000,
    amount: -0.003,
    amountOrig: -0.023,
    amountExecuted: 0,
    type: 'EXCHANGE LIMIT',
    typePrev: null,
    flags: '0',
    status: 'CANCELED was: PARTIALLY FILLED @ 18030.0(-0.02)',
    price: 18030,
    priceAvg: 18030,
    priceTrailing: 0,
    priceAuxLimit: 0,
    notify: 0,
    placedId: null,
  },
  {
    id: 1149717527,
    gid: null,
    cid: 43119658499,
    pair: 'BTC/USD',
    mtsCreate: 1529409520000,
    mtsUpdate: 1529549259000,
    amount: 1,
    amountOrig: 1,
    amountExecuted: 0,
    type: 'EXCHANGE LIMIT',
    typePrev: null,
    flags: '0',
    status: 'CANCELED',
    price: 17.6,
    priceAvg: 0,
    priceTrailing: 0,
    priceAuxLimit: 0,
    notify: 0,
    placedId: null,
  },
  {
    id: 1149715964,
    gid: null,
    cid: 12175783466,
    pair: 'BTC/USD',
    mtsCreate: 1527564176000,
    mtsUpdate: 1527625559000,
    amount: 0,
    amountOrig: -1,
    amountExecuted: -1,
    type: 'EXCHANGE LIMIT',
    typePrev: null,
    flags: 0,
    status: 'EXECUTED @ 1020.0(-0.81): was PARTIALLY FILLED @ 1020.0(-0.09), PARTIALLY FILLED @ 1020.0(-0.1)',
    price: 1020,
    priceAvg: 1020,
    priceTrailing: 0,
    priceAuxLimit: 0,
    notify: 0,
    placedId: null,
  },
]

test('renders without crashing', () => {
  const div = document.createElement('div')
  renderWithIntl(<Orders />, div)
  ReactDOM.unmountComponentAtNode(div)
})

test('renders without crashing with data', () => {
  const div = document.createElement('div')
  renderWithIntl(<Orders
    loading={false}
    entries={ENTRIES}
    handleClickExport={() => {}}
  />, div)
  ReactDOM.unmountComponentAtNode(div)
})

test('render loading correctly', () => {
  const component = rendererCreateWithIntl(<Orders />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('render no data correctly', () => {
  const component = rendererCreateWithIntl(<Orders loading={false} entries={NO_ENTRY} />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

// test('render correctly with data', () => {
//   const component = rendererCreateWithIntl(<Orders loading={false} entries={ENTRIES} />)
//   const tree = component.toJSON()
//   expect(tree).toMatchSnapshot()
// })
