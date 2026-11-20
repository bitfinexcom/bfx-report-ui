import React, { act } from 'react'
import { createRoot } from 'react-dom/client'

import queryConstants from 'state/query/constants'

import useFetchLifecycle from '../useFetchLifecycle'

jest.mock('config', () => ({
  __esModule: true,
  default: {
    ...jest.requireActual('config').default,
    showFrameworkMode: true,
  },
}))

window.IS_REACT_ACT_ENVIRONMENT = true

const TYPE = queryConstants.MENU_LEDGERS

const Section = (props) => {
  useFetchLifecycle(TYPE, props)
  return null
}

const buildProps = (props = {}) => ({
  pageLoading: false,
  dataReceived: false,
  isSyncRequired: false,
  fetchData: jest.fn(),
  setTargetSymbols: jest.fn(),
  match: { params: { symbol: 'BTC,ETH' } },
  ...props,
})

describe('useFetchLifecycle - url hydration on mount', () => {
  let root

  const mount = (props) => {
    root = createRoot(document.createElement('div'))
    act(() => {
      root.render(<Section {...props} />)
    })
  }

  afterEach(() => {
    act(() => {
      root.unmount()
    })
  })

  it('should set symbols from the url and fetch when nothing is loaded yet', () => {
    const props = buildProps()

    mount(props)

    expect(props.setTargetSymbols).toHaveBeenCalledWith(['BTC', 'ETH'])
    expect(props.fetchData).toHaveBeenCalledTimes(1)
  })

  it('should keep the loaded data when it is already received', () => {
    const props = buildProps({ dataReceived: true })

    mount(props)

    expect(props.setTargetSymbols).not.toHaveBeenCalled()
    expect(props.fetchData).not.toHaveBeenCalled()
  })

  it('should not interrupt the page that is still loading', () => {
    const props = buildProps({ pageLoading: true })

    mount(props)

    expect(props.setTargetSymbols).not.toHaveBeenCalled()
    expect(props.fetchData).not.toHaveBeenCalled()
  })

  it('should set symbols from the url before the initial sync and defer the fetch', () => {
    const props = buildProps({ isSyncRequired: true })

    mount(props)

    expect(props.setTargetSymbols).toHaveBeenCalledWith(['BTC', 'ETH'])
    expect(props.fetchData).not.toHaveBeenCalled()
  })
})
