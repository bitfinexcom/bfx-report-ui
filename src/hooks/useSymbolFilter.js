import { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { generateUrl } from 'state/utils'
import { demapSymbols } from 'state/symbols/utils'

const useSymbolFilter = (type, {
  getTargetSymbols,
  addTargetSymbol,
  removeTargetSymbol,
  clearTargetSymbols,
}) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const targetSymbols = useSelector(getTargetSymbols)

  const toggleSymbol = useCallback((symbol) => {
    let nextSymbols

    if (!targetSymbols.includes(symbol)) {
      nextSymbols = [...targetSymbols, symbol]
      dispatch(addTargetSymbol(symbol))
    } else {
      nextSymbols = targetSymbols.filter(tag => symbol !== tag)
      dispatch(removeTargetSymbol(symbol))
    }
    history.push(generateUrl(type, window.location.search, demapSymbols(nextSymbols)))
  }, [targetSymbols, dispatch, history, type])

  const clearSymbols = useCallback(() => {
    dispatch(clearTargetSymbols())
    history.push(generateUrl(type, window.location.search))
  }, [dispatch, history, type])

  return { targetSymbols, toggleSymbol, clearSymbols }
}

export default useSymbolFilter
