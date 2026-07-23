import { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { generateUrl } from 'state/utils'
import { demapPairs } from 'state/symbols/utils'

const useSinglePairFilter = (type, {
  getTargetPair,
  setTargetPair,
}) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const targetPair = useSelector(getTargetPair)

  const setPair = useCallback((pair) => {
    if (targetPair !== pair) {
      dispatch(setTargetPair(pair))
      history.push(generateUrl(type, window.location.search, demapPairs(pair)))
    }
  }, [targetPair, dispatch, history, type])

  return { targetPair, setPair }
}

export default useSinglePairFilter
