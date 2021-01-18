import {
  createStore,
  applyMiddleware,
  compose,
} from 'redux'
import createSagaMiddleware from 'redux-saga'
import { createLogger } from 'redux-logger'
import { persistStore } from 'redux-persist'
import { routerMiddleware } from 'connected-react-router'

import reducer from './reducers'
import saga from './sagas'
import history from './createdHistory'

const { CI_ENVIRONMENT_NAME = 'development' } = process.env

const sagaMiddleware = createSagaMiddleware()

function configureStore() {
  // eslint-disable-next-line no-underscore-dangle
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  // add middlewares here
  const middleware = [sagaMiddleware, routerMiddleware(history)]
  // use the logger in development mode - this is set in webpack.config.dev.js
  if (CI_ENVIRONMENT_NAME === 'development' || CI_ENVIRONMENT_NAME === 'staging') {
    middleware.push(createLogger())
  }

  return createStore(
    reducer,
    composeEnhancers(applyMiddleware(...middleware)),
  )
}

const store = configureStore()
const persistor = persistStore(store)

if (CI_ENVIRONMENT_NAME !== 'testing') {
  sagaMiddleware.run(saga)
}

export {
  configureStore,
  persistor,
  store,
}
