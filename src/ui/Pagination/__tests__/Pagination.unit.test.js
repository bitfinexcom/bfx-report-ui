import React from 'react'
import ReactDOM from 'react-dom'
import { mount } from 'enzyme'

import { rendererCreateWithIntl } from 'tests/helper'
import types from 'state/query/constants'

import Pagination from '../Pagination'

jest.mock('ui/QueryLimitSelector', () => () => (
  <div id='mockQueryLimitSelector'>
   QueryLimitSelector
  </div>
))

const GET_DEFAULT_QUERY_LIMIT = () => 500
const MOCK_DEFAULT_TYPE = types.MENU_PUBLIC_TRADES
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
    dataLen: 124,
    offset: 124,
    pageOffset: 0,
    placeholder: 1,
    totalPages: '1',
  },
  {
    title: 'render correctly in 1 of 2 pages',
    type: MOCK_DEFAULT_TYPE,
    dataLen: 200,
    offset: 200,
    pageOffset: 0,
    placeholder: 1,
    totalPages: '2',
  },
  {
    title: 'render correctly in 2 of 2 pages',
    type: MOCK_DEFAULT_TYPE,
    dataLen: 200,
    offset: 200,
    pageOffset: 125,
    placeholder: 2,
    totalPages: '2',
  },
  {
    title: 'render correctly in 3 of 4 pages',
    type: MOCK_DEFAULT_TYPE,
    dataLen: 400,
    offset: 400,
    pageOffset: 250,
    placeholder: 3,
    totalPages: '4',
  },
  {
    title: 'render correctly in 4 of 4 pages',
    type: MOCK_DEFAULT_TYPE,
    dataLen: 450,
    offset: 450,
    pageOffset: 375,
    placeholder: 4,
    totalPages: '4',
  },
  {
    title: 'render correctly in 1 of 4 pages',
    type: MOCK_DEFAULT_TYPE,
    dataLen: 500,
    offset: 500,
    pageOffset: 0,
    placeholder: 1,
    totalPages: '4',
    nextPage: true,
  },
  {
    title: 'render correctly in 5 of 5 pages',
    type: MOCK_DEFAULT_TYPE,
    dataLen: 510,
    offset: 510,
    pageOffset: 0,
    placeholder: 5,
    totalPages: '5',
  },
  {
    title: 'render correctly in 5 of 7 pages',
    type: MOCK_DEFAULT_TYPE,
    dataLen: 850,
    offset: 850,
    pageOffset: 0,
    placeholder: 5,
    totalPages: '7',
  },
  {
    title: 'render correctly in 6 of 7 pages',
    type: MOCK_DEFAULT_TYPE,
    dataLen: 850,
    offset: 850,
    pageOffset: 125,
    placeholder: 6,
    totalPages: '7',
  },
  {
    title: 'render correctly in 5 of 8 pages',
    type: MOCK_DEFAULT_TYPE,
    dataLen: 1000,
    offset: 1000,
    pageOffset: 0,
    placeholder: 5,
    totalPages: '8',
    nextPage: true,
  },
  {
    title: 'render correctly in 9 of 9 pages',
    type: MOCK_DEFAULT_TYPE,
    dataLen: 1100,
    offset: 1100,
    pageOffset: 0,
    placeholder: 9,
    totalPages: '9',
  },
  {
    title: 'render trades correctly in 1 of 1 pages',
    type: types.MENU_TRADES,
    dataLen: 1,
    offset: 1,
    pageOffset: 0,
    placeholder: 1,
    totalPages: '1',
  },
  {
    title: 'render trades correctly in 1 of 2 pages',
    type: types.MENU_TRADES,
    dataLen: 151,
    offset: 151,
    pageOffset: 0,
    placeholder: 1,
    totalPages: '2',
  },
  {
    title: 'render trades correctly in 1 of 2 pages',
    type: types.MENU_TRADES,
    dataLen: 151,
    offset: 151,
    pageOffset: 125,
    placeholder: 2,
    totalPages: '2',
  },
  {
    title: 'render trades correctly in 12 of 12 pages',
    type: types.MENU_TRADES,
    dataLen: 1480,
    offset: 1480,
    pageOffset: 375,
    placeholder: 12,
    totalPages: '12',
  },
  {
    title: 'render trades correctly in 1 of 12 pages',
    type: types.MENU_TRADES,
    dataLen: 1500,
    offset: 0,
    pageOffset: 0,
    placeholder: 1,
    totalPages: '12',
    nextPage: true,
  },
  {
    title: 'render trades correctly in 11 of 12 pages',
    type: types.MENU_TRADES,
    dataLen: 1480,
    offset: 1480,
    pageOffset: 250,
    placeholder: 11,
    totalPages: '12',
  },
]

test('renders without crashing', () => {
  const div = document.createElement('div')
  mount(
    <Pagination
      type={MOCK_DEFAULT_TYPE}
      dataLen={1}
      offset={1}
      pageOffset={0}
      getQueryLimit={GET_DEFAULT_QUERY_LIMIT}
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
        nextPage={entry.nextPage || false}
        getQueryLimit={GET_DEFAULT_QUERY_LIMIT}
      />,
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
    // placeholder
    expect(tree.children[0].children[3].props.placeholder).toEqual(entry.placeholder)
    // total pages
    expect(tree.children[0].children[6]).toEqual(entry.totalPages)
  })
})
