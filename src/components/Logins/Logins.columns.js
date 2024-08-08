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
  filteredData,
  columnsWidth,
}) => [
  {
    id: 'id',
    name: 'column.id',
    className: 'align-left',
    width: getColumnWidth('id', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const { id } = filteredData[rowIndex]
      return getCell(id, t)
    },
    copyText: rowIndex => filteredData[rowIndex].id,
  },
  {
    id: 'time',
    className: 'align-left',
    nameStr: `${t('column.date')} (${timeOffset})`,
    width: getColumnWidth('time', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const timestamp = getFullTime(filteredData[rowIndex].time)
      return getCell(timestamp, t)
    },
    copyText: rowIndex => getFullTime(filteredData[rowIndex].time),
  },
  {
    id: 'ip',
    name: 'column.ip',
    className: 'align-left',
    width: getColumnWidth('ip', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const { ip } = filteredData[rowIndex]
      return getCell(ip, t)
    },
    copyText: rowIndex => filteredData[rowIndex].ip,
  },
  {
    id: 'browser',
    name: 'column.browser',
    className: 'align-left',
    width: getColumnWidth('browser', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const { browser } = filteredData[rowIndex]
      return getCell(browser, t)
    },
    copyText: rowIndex => filteredData[rowIndex].browser,
  },
  {
    id: 'version',
    name: 'column.version',
    className: 'align-left',
    width: getColumnWidth('version', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const { version } = filteredData[rowIndex]
      return getCell(version, t)
    },
    copyText: rowIndex => filteredData[rowIndex].version,
  },
  {
    id: 'mobile',
    name: 'column.mobile',
    className: 'align-left',
    width: getColumnWidth('mobile', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const { mobile } = filteredData[rowIndex]
      return getCell(mobile, t)
    },
    copyText: rowIndex => filteredData[rowIndex].mobile,
  },
  {
    id: 'extra',
    name: 'column.meta',
    className: 'align-left',
    width: getColumnWidth('extra', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const { extra } = filteredData[rowIndex]
      return getJsonFormattedCell(extra)
    },
    copyText: rowIndex => JSON.stringify(filteredData[rowIndex].extra, undefined, 2),
  },
]
