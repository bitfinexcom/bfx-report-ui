import {
  getCell,
  getCellState,
  getColumnWidth,
  getJsonFormattedCell,
} from 'utils/columns'

export const getColumns = ({
  t,
  isNoData,
  isLoading,
  timeOffset,
  getFullTime,
  columnsWidth,
  filteredData,
}) => [
  {
    id: 'mtsCreate',
    nameStr: `${t('column.date')} (${timeOffset})`,
    width: getColumnWidth('mtsCreate', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const timestamp = getFullTime(filteredData[rowIndex].mtsCreate)
      return getCell(timestamp, t)
    },
    copyText: rowIndex => getFullTime(filteredData[rowIndex].mtsCreate),
  },
  {
    id: 'log',
    name: 'column.description',
    width: getColumnWidth('log', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const { log } = filteredData[rowIndex]
      return getCell(log, t)
    },
    copyText: rowIndex => filteredData[rowIndex].log,
  },
  {
    id: 'ip',
    name: 'column.ip',
    width: getColumnWidth('ip', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const { ip } = filteredData[rowIndex]
      return getCell(ip, t)
    },
    copyText: rowIndex => filteredData[rowIndex].ip,
  },
  {
    id: 'userAgent',
    name: 'column.meta',
    width: getColumnWidth('userAgent', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const { userAgent } = filteredData[rowIndex]
      return getJsonFormattedCell(userAgent)
    },
    copyText: rowIndex => filteredData[rowIndex].userAgent,
  },
]
