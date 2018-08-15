import React from 'react'
import ReactDOM from 'react-dom'
import {
  renderWithIntl,
  rendererCreateWithIntl,
} from 'tests/helper'

import Pagination from '../Pagination'

const TYPE_LEDGERS = 'ledgers'
const TYPE_TRADES = 'trades'
const MOCK_DEFAULT_TYPE = TYPE_LEDGERS
const TEST_CASES = [
  {
    title: 'render correctly with 1 entry',
    type: MOCK_DEFAULT_TYPE,
    dataLen: 1,
    offset: 1,
    pageOffset: 0,
    placeholder: 1,
    totalPages: '1',
  },
  {
    title: 'render correctly with 35 entry',
    type: MOCK_DEFAULT_TYPE,
    dataLen: 35,
    offset: 35,
    pageOffset: 0,
    placeholder: 1,
    totalPages: '1',
  },
  {
    title: 'render correctly in 1 of 1 page',
    type: MOCK_DEFAULT_TYPE,
    dataLen: 199,
    offset: 199,
    pageOffset: 0,
    placeholder: 1,
    totalPages: '1',
  },
  {
    title: 'render correctly in 1 of 2 pages',
    type: MOCK_DEFAULT_TYPE,
    dataLen: 350,
    offset: 350,
    pageOffset: 0,
    placeholder: 1,
    totalPages: '2',
  },
  {
    title: 'render correctly in 2 of 2 pages',
    type: MOCK_DEFAULT_TYPE,
    dataLen: 350,
    offset: 350,
    pageOffset: 200,
    placeholder: 2,
    totalPages: '2',
  },
  {
    title: 'render correctly in 3 of 4 pages',
    type: MOCK_DEFAULT_TYPE,
    dataLen: 650,
    offset: 650,
    pageOffset: 400,
    placeholder: 3,
    totalPages: '4',
  },
  {
    title: 'render correctly in 24 of 25 pages',
    type: MOCK_DEFAULT_TYPE,
    dataLen: 4850,
    offset: 4850,
    pageOffset: 4600,
    placeholder: 24,
    totalPages: '25',
  },
  {
    title: 'render correctly in 25 of 25 pages',
    type: MOCK_DEFAULT_TYPE,
    dataLen: 4850,
    offset: 4850,
    pageOffset: 4800,
    placeholder: 25,
    totalPages: '25',
  },
  {
    title: 'render correctly in 25 of 25 pages',
    type: MOCK_DEFAULT_TYPE,
    dataLen: 5000,
    offset: 5000,
    pageOffset: 0,
    placeholder: 25,
    totalPages: '25',
  },
  {
    title: 'render correctly in 26 of 26 pages',
    type: MOCK_DEFAULT_TYPE,
    dataLen: 5100,
    offset: 5100,
    pageOffset: 0,
    placeholder: 26,
    totalPages: '26',
  },
  {
    title: 'render correctly in 26 of 28 pages',
    type: MOCK_DEFAULT_TYPE,
    dataLen: 5500,
    offset: 5500,
    pageOffset: 0,
    placeholder: 26,
    totalPages: '28',
  },
  {
    title: 'render correctly in 27 of 28 pages',
    type: MOCK_DEFAULT_TYPE,
    dataLen: 5500,
    offset: 5500,
    pageOffset: 200,
    placeholder: 27,
    totalPages: '28',
  },
  {
    title: 'render correctly in 50 of 50 pages',
    type: MOCK_DEFAULT_TYPE,
    dataLen: 10000,
    offset: 10000,
    pageOffset: 0,
    placeholder: 50,
    totalPages: '50',
  },
  {
    title: 'render correctly in 51 of 51 pages',
    type: MOCK_DEFAULT_TYPE,
    dataLen: 10100,
    offset: 10100,
    pageOffset: 0,
    placeholder: 51,
    totalPages: '51',
  },
  {
    title: 'render trades correctly in 1 of 1 pages',
    type: TYPE_TRADES,
    dataLen: 1,
    offset: 1,
    pageOffset: 0,
    placeholder: 1,
    totalPages: '1',
  },
  {
    title: 'render trades correctly in 1 of 2 pages',
    type: TYPE_TRADES,
    dataLen: 151,
    offset: 151,
    pageOffset: 0,
    placeholder: 1,
    totalPages: '2',
  },
  {
    title: 'render trades correctly in 1 of 2 pages',
    type: TYPE_TRADES,
    dataLen: 151,
    offset: 151,
    pageOffset: 150,
    placeholder: 2,
    totalPages: '2',
  },
  {
    title: 'render trades correctly in 10 of 10 pages',
    type: TYPE_TRADES,
    dataLen: 1480,
    offset: 1480,
    pageOffset: 1350,
    placeholder: 10,
    totalPages: '10',
  },
  {
    title: 'render trades correctly in 10 of 10 pages',
    type: TYPE_TRADES,
    dataLen: 1500,
    offset: 1500,
    pageOffset: 0,
    placeholder: 10,
    totalPages: '10',
  },
  {
    title: 'render trades correctly in 11 of 12 pages',
    type: TYPE_TRADES,
    dataLen: 1700,
    offset: 1700,
    pageOffset: 0,
    placeholder: 11,
    totalPages: '12',
  },
]

test('renders without crashing', () => {
  const div = document.createElement('div')
  renderWithIntl(
    <Pagination
      type={MOCK_DEFAULT_TYPE}
      dataLen={1}
      offset={1}
      pageOffset={0}
    />, div,
  )
  ReactDOM.unmountComponentAtNode(div)
})

TEST_CASES.forEach((entry) => {
  test(entry.title, () => {
    const component = rendererCreateWithIntl(
      <Pagination
        type={entry.type}
        dataLen={entry.dataLen}
        offset={entry.offset}
        pageOffset={entry.pageOffset}
      />,
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
    // placeholder
    expect(tree.children[3].props.placeholder).toEqual(entry.placeholder)
    // total pages
    expect(tree.children[6]).toEqual(entry.totalPages)
  })
})
