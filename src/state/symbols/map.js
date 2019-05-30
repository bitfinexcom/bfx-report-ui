export const getSymbolMap = () => {
  const mapping = localStorage.getItem('symbolMap')
  return mapping ? JSON.parse(mapping) : {}
}

const symbolMap = getSymbolMap() || {}

export const setSymbolMap = (map) => {
  localStorage.setItem('symbolMap', JSON.stringify(map))
  Object.assign(symbolMap, map)
}

export default symbolMap
