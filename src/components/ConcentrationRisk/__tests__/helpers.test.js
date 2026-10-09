import { parseData } from '../ConcentrationRisk.helpers'

describe('parseData', () => {
  it('should aggregate balances by currency', () => {
    const { tableData } = parseData([
      { currency: 'BTC', balanceUsd: 100 },
      { currency: 'ETH', balanceUsd: 30 },
      { currency: 'BTC', balanceUsd: 70 },
    ])

    expect(tableData).toEqual([
      { currency: 'BTC', balanceUsd: 170, percent: '85.00000000' },
      { currency: 'ETH', balanceUsd: 30, percent: '15.00000000' },
    ])
  })

  it('should order table data by balanceUsd descending', () => {
    const { tableData } = parseData([
      { currency: 'ETH', balanceUsd: 50 },
      { currency: 'BTC', balanceUsd: 300 },
      { currency: 'USD', balanceUsd: 150 },
      { currency: 'LTC', balanceUsd: 500 },
    ])

    expect(tableData.map(({ currency }) => currency)).toEqual(['LTC', 'BTC', 'USD', 'ETH'])
  })

  it('should keep input order for equal balances', () => {
    const { tableData } = parseData([
      { currency: 'AAA', balanceUsd: 100 },
      { currency: 'BBB', balanceUsd: 100 },
      { currency: 'CCC', balanceUsd: 100 },
    ])

    expect(tableData.map(({ currency }) => currency)).toEqual(['AAA', 'BBB', 'CCC'])
  })

  it('should skip entries with falsy balanceUsd', () => {
    const { tableData } = parseData([
      { currency: 'BTC', balanceUsd: 100 },
      { currency: 'ETH', balanceUsd: 0 },
      { currency: 'USD', balanceUsd: undefined },
      { currency: 'LTC', balanceUsd: null },
    ])

    expect(tableData).toEqual([
      { currency: 'BTC', balanceUsd: 100, percent: '100.00000000' },
    ])
  })

  it('should keep only entries above 0.1 percent in chart data', () => {
    const { chartData } = parseData([
      { currency: 'BTC', balanceUsd: 900 },
      { currency: 'ETH', balanceUsd: 100 },
      { currency: 'USD', balanceUsd: 0.5 },
    ])

    expect(chartData).toEqual([
      { name: 'BTC', value: 900 },
      { name: 'ETH', value: 100 },
    ])
  })

  it('should return chart data in the same order as table data', () => {
    const { tableData, chartData } = parseData([
      { currency: 'ETH', balanceUsd: 50 },
      { currency: 'BTC', balanceUsd: 300 },
      { currency: 'LTC', balanceUsd: 500 },
    ])

    expect(chartData.map(({ name }) => name)).toEqual(tableData.map(({ currency }) => currency))
  })

  it('should handle empty data', () => {
    expect(parseData([])).toEqual({ tableData: [], chartData: [] })
  })
})
