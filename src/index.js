import { createElement as e } from 'react'
import { render } from 'react-dom'
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import { createLogger } from 'redux-logger'

import 'normalize.css/normalize.css'

import App from './App'
import reduce from './state'

const logger = createLogger({
  stateTransformer: (state) => state.toJS()
})

const store = createStore(
  reduce,
  applyMiddleware(logger)
)

render(
  e(Provider, {store}, e(App)),
  document.getElementById('root')
)
