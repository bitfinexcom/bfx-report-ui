import React from 'react'
import ReactDOM from 'react-dom'
import {
  renderWithIntl,
  rendererCreateWithIntl,
} from 'tests/helper'

import Pagination from '../Pagination'

const MOCK_TYPE = 'ledgers'
const TEST_CASES = [
  {
    title: 'render correctly with 1 entry',
    dataLen: 1,
    offset: 1,
    pageOffset: 0,
    placeholder: 1,
    totalPages: '1',
  },
  {
    title: 'render correctly with 35 entry',
    dataLen: 35,
    offset: 35,
    pageOffset: 0,
    placeholder: 1,
    totalPages: '1',
  },
  {
    title: 'render correctly in 1 of 1 page',
    dataLen: 199,
    offset: 199,
    pageOffset: 0,
    placeholder: 1,
    totalPages: '1',
  },
  {
    title: 'render correctly in 1 of 2 pages',
    dataLen: 350,
    offset: 350,
    pageOffset: 0,
    placeholder: 1,
    totalPages: '2',
  },
  {
    title: 'render correctly in 2 of 2 pages',
    dataLen: 350,
    offset: 350,
    pageOffset: 200,
    placeholder: 2,
    totalPages: '2',
  },
  {
    title: 'render correctly in 3 of 4 pages',
    dataLen: 650,
    offset: 650,
    pageOffset: 400,
    placeholder: 3,
    totalPages: '4',
  },
  {
    title: 'render correctly in 24 of 25 pages',
    dataLen: 4850,
    offset: 4850,
    pageOffset: 4600,
    placeholder: 24,
    totalPages: '25',
  },
  {
    title: 'render correctly in 25 of 25 pages',
    dataLen: 4850,
    offset: 4850,
    pageOffset: 4800,
    placeholder: 25,
    totalPages: '25',
  },
  {
    title: 'render correctly in 26 of 26 pages',
    dataLen: 5100,
    offset: 5100,
    pageOffset: 0,
    placeholder: 26,
    totalPages: '26',
  },
  {
    title: 'render correctly in 26 of 28 pages',
    dataLen: 5500,
    offset: 5500,
    pageOffset: 0,
    placeholder: 26,
    totalPages: '28',
  },
  {
    title: 'render correctly in 27 of 28 pages',
    dataLen: 5500,
    offset: 5500,
    pageOffset: 200,
    placeholder: 27,
    totalPages: '28',
  },
  {
    title: 'render correctly in 51 of 51 pages',
    dataLen: 10100,
    offset: 10100,
    pageOffset: 0,
    placeholder: 51,
    totalPages: '51',
  },
]

test('renders without crashing', () => {
  const div = document.createElement('div')
  renderWithIntl(
    <Pagination
      type={MOCK_TYPE}
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
        type={MOCK_TYPE}
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
