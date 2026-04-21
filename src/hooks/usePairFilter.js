import { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { generateUrl } from 'state/utils'
import { demapPairs } from 'state/symbols/utils'

const usePairFilter = (type, {
  addTargetPair,
  getTargetPairs,
  removeTargetPair,
  clearTargetPairs,
}) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const targetPairs = useSelector(getTargetPairs)

  const togglePair = useCallback((pair) => {
    let nextPairs

    if (!targetPairs.includes(pair)) {
      nextPairs = [...targetPairs, pair]
      dispatch(addTargetPair(pair))
    } else {
      nextPairs = targetPairs.filter(tag => pair !== tag)
      dispatch(removeTargetPair(pair))
    }
    history.push(generateUrl(type, window.location.search, demapPairs(nextPairs)))
  }, [targetPairs, dispatch, history, type])

  const clearPairs = useCallback(() => {
    dispatch(clearTargetPairs())
    history.push(generateUrl(type, window.location.search))
  }, [dispatch, history, type])

  return { targetPairs, togglePair, clearPairs }
}

export default usePairFilter
