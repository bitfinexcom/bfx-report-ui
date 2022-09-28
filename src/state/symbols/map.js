/* eslint-disable lines-between-class-members */
/* eslint-disable no-underscore-dangle */
class SymbolMap {
  constructor() {
    const symbolMapping = localStorage.getItem('symbolMap')
    this.setSymbols(symbolMapping ? JSON.parse(symbolMapping) : {}, false)

    const pairMapping = localStorage.getItem('pairMap')
    this.setPairs(pairMapping ? JSON.parse(pairMapping) : {}, false)
  }

  symbols = {}
  symbolsDemap = {}
  pairs = {}
  pairsDemap = {}

  _storeMap = (storageKey, map) => {
    localStorage.setItem(storageKey, JSON.stringify(map))
  }

  _getDemap = (map) => Object.keys(map).reduce((acc, symbol) => {
    const mappedSymbol = map[symbol]
    acc[mappedSymbol] = symbol
    return acc
  }, {})

  setSymbols = (map = {}, isStored = true) => {
    if (isStored) {
      this._storeMap('symbolMap', map)
    }
    this.symbols = map
    this.symbolsDemap = this._getDemap(map)
  }

  setPairs = (map = {}, isStored = true) => {
    if (isStored) {
      this._storeMap('pairMap', map)
    }
    this.pairs = map
    this.pairsDemap = this._getDemap(map)
  }
}

export default new SymbolMap()
