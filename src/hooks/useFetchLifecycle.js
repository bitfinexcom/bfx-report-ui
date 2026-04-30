import { useEffect, useRef } from 'react'
import { isEqual } from '@bitfinex/lib-js-util-base'

import config from 'config'
import { isValidateType } from 'state/utils'
import { getIsSyncRequiredType } from 'state/query/utils'
import { getMappedSymbolsFromUrl } from 'state/symbols/utils'

const { showFrameworkMode } = config

const useFetchLifecycle = (type, {
  match,
  params,
  fetchData,
  pageLoading,
  dataReceived,
  setTargetPair,
  isSyncRequired,
  setTargetPairs,
  setTargetSymbol,
  setTargetSymbols,
  shouldRefreshAfterSync,
  setShouldRefreshAfterSync,
} = {}) => {
  const prevParams = useRef(params)
  const isFirstRender = useRef(true)
  const prevDataReceived = useRef(dataReceived)
  const prevIsSyncRequired = useRef(isSyncRequired)

  // URL -> Redux hydration (mount only). Decoupled from sync-gated fetch so
  // selections from URL survive framework-mode reloads where isSyncRequired
  // starts as true and fetch is deferred until initial sync completes.
  useEffect(() => {
    // multi-pair from URL (MENU_TRADES, MENU_ORDERS, MENU_DERIVATIVES, etc.)
    if (setTargetPairs && match?.params?.pair) {
      setTargetPairs(getMappedSymbolsFromUrl(match.params.pair))
    }
    // single pair from URL (MENU_PUBLIC_TRADES, MENU_WEIGHTED_AVERAGES)
    if (setTargetPair && match?.params?.pair) {
      setTargetPair(getMappedSymbolsFromUrl(match.params.pair)[0])
    }
    // multi-symbol from URL (MENU_LEDGERS, MENU_MOVEMENTS, etc.)
    if (setTargetSymbols && match?.params?.symbol) {
      setTargetSymbols(getMappedSymbolsFromUrl(match.params.symbol))
    }
    // single symbol from URL (MENU_PUBLIC_FUNDING)
    if (setTargetSymbol && match?.params?.symbol) {
      setTargetSymbol(getMappedSymbolsFromUrl(match.params.symbol)[0])
    }
  }, [])

  // checkInit (mount only)
  useEffect(() => {
    const shouldWaitInitialSync = showFrameworkMode && isSyncRequired

    if (shouldWaitInitialSync) {
      return
    }

    if (!dataReceived && !pageLoading) {
      fetchData()
    }
  }, [])

  // checkFetch (updates only, mirrors componentDidUpdate)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    if (!isValidateType(type)) {
      return
    }

    // dataReceived flipped to false (reset scenario)
    if (!dataReceived && dataReceived !== prevDataReceived.current && !pageLoading) {
      fetchData()
    }

    // sync requirement changed
    const shouldRefresh = prevIsSyncRequired.current !== isSyncRequired
    if (showFrameworkMode && shouldRefresh) {
      fetchData()
    }

    // should refresh after sync completed
    const shouldBeRefreshedAfterSync = showFrameworkMode
      && getIsSyncRequiredType(type)
      && shouldRefreshAfterSync
    if (shouldBeRefreshedAfterSync && !isSyncRequired) {
      fetchData()
      if (setShouldRefreshAfterSync) {
        setShouldRefreshAfterSync(false)
      }
    }

    // params changed (deep comparison)
    if (!isEqual(prevParams.current, params)) {
      fetchData()
    }

    prevDataReceived.current = dataReceived
    prevIsSyncRequired.current = isSyncRequired
    prevParams.current = params
  })
}

export default useFetchLifecycle
