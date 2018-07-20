import React from 'react'
import ReactDOM from 'react-dom'
import {
  renderWithIntl,
  rendererCreateWithIntl,
} from 'tests/helper'
import Trades from '../Trades'

const NO_ENTRY = []
const ENTRIES = [
  {
    id: 24178705,
    pair: 'BTC/USD',
    mtsCreate: 1529941980000,
    orderID: 1149732382,
    execAmount: -0.2,
    execPrice: 18037,
    orderType: null,
    orderPrice: null,
    maker: null,
    fee: 3.6074,
    feeCurrency: 'USD',
  },
  {
    id: 24173026,
    pair: 'BTC/USD',
    mtsCreate: 1529576032000,
    orderID: 1149721794,
    execAmount: 0.2,
    execPrice: 16560,
    orderType: null,
    orderPrice: null,
    maker: null,
    fee: 0.0002,
    feeCurrency: 'BTC',
  },
  {
    id: 24172974,
    pair: 'BTC/USD',
    mtsCreate: 1529575757000,
    orderID: 1149721793,
    execAmount: -0.5,
    execPrice: 18061,
    orderType: null,
    orderPrice: null,
    maker: null,
    fee: 9.0305,
    feeCurrency: 'USD',
  },
  {
    id: 24172972,
    pair: 'BTC/USD',
    mtsCreate: 1529575721000,
    orderID: 1149721791,
    execAmount: 0.4,
    execPrice: 17410,
    orderType: null,
    orderPrice: null,
    maker: null,
    fee: 0.0004,
    feeCurrency: 'BTC',
  },
  {
    id: 24172911,
    pair: 'BTC/USD',
    mtsCreate: 1529489381000,
    orderID: 1149717543,
    execAmount: -0.02,
    execPrice: 18030,
    orderType: null,
    orderPrice: null,
    maker: null,
    fee: 0.3606,
    feeCurrency: 'USD',
  },
  {
    id: 24172277,
    pair: 'BTC/USD',
    mtsCreate: 1527625560000,
    orderID: 1149715964,
    execAmount: -0.81,
    execPrice: 1020,
    orderType: null,
    orderPrice: null,
    maker: null,
    fee: 0.8262,
    feeCurrency: 'USD',
  },
  {
    id: 24172276,
    pair: 'BTC/USD',
    mtsCreate: 1527625496000,
    orderID: 1149715964,
    execAmount: -0.1,
    execPrice: 1020,
    orderType: null,
    orderPrice: null,
    maker: null,
    fee: 0.102,
    feeCurrency: 'USD',
  },
  {
    id: 24172275,
    pair: 'BTC/USD',
    mtsCreate: 1527625475000,
    orderID: 1149715964,
    execAmount: -0.09,
    execPrice: 1020,
    orderType: null,
    orderPrice: null,
    maker: null,
    fee: 0.0918,
    feeCurrency: 'USD',
  },
]

test('renders without crashing', () => {
  const div = document.createElement('div')
  renderWithIntl(<Trades />, div)
  ReactDOM.unmountComponentAtNode(div)
})

test('renders without crashing with data', () => {
  const div = document.createElement('div')
  renderWithIntl(<Trades loading={false} entries={ENTRIES} />, div)
  ReactDOM.unmountComponentAtNode(div)
})

test('render loading correctly', () => {
  const component = rendererCreateWithIntl(<Trades />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('render no data correctly', () => {
  const component = rendererCreateWithIntl(<Trades loading={false} entries={NO_ENTRY} />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

// test('render correctly with data', () => {
//   const component = rendererCreateWithIntl(<Trades loading={false} entries={ENTRIES} />)
//   const tree = component.toJSON()
//   expect(tree).toMatchSnapshot()
// })
