import _includes from 'lodash/includes'

import { loggerLevels } from '../var/platform'

const LOGGER_LEVEL = {
  LOG: 'log',
  DEBUG: 'debug',
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error',
}

export const logger = {
  log(...args) {
    if (_includes(loggerLevels, LOGGER_LEVEL.LOG)) {
      // eslint-disable-next-line no-console
      console.log(...args)
    }
  },

  debug(...args) {
    if (_includes(loggerLevels, LOGGER_LEVEL.DEBUG)) {
      // eslint-disable-next-line no-console
      console.debug(...args)
    }
  },

  info(...args) {
    if (_includes(loggerLevels, LOGGER_LEVEL.INFO)) {
      // eslint-disable-next-line no-console
      console.info(...args)
    }
  },

  warn(...args) {
    if (_includes(loggerLevels, LOGGER_LEVEL.WARN)) {
      // eslint-disable-next-line no-console
      console.warn(...args)
    }
  },

  error(...args) {
    if (_includes(loggerLevels, LOGGER_LEVEL.ERROR)) {
      // eslint-disable-next-line no-console
      console.error(...args)
    }
  },

  devStagingError(...args) {
    if (process.env.CI_ENVIRONMENT_NAME === 'staging') {
      // eslint-disable-next-line no-console
      console.error(...args)
    }
  },

  devStagingExecAndWarn(fn, ...args) {
    if (process.env.CI_ENVIRONMENT_NAME === 'staging') {
      const message = fn(...args)
      // eslint-disable-next-line no-console
      console.warn(message)
    }
  },
}
