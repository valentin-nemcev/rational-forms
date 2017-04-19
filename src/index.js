import { createElement as e } from 'react'
import { render } from 'react-dom'
import { compose, applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import { createLogger } from 'redux-logger'
import PouchDB from 'pouchdb'

import App from './App'
import reduce from './state'
import persistStore from './persistence'

// For PouchDB Inspector
window.PouchDB = PouchDB

const db = new PouchDB('rational-forms')
PouchDB.debug.enable('pouchdb:api')

const logger = createLogger({
  stateTransformer: (state) => state.toJS()
})

const store = createStore(
  reduce,
  compose(
    applyMiddleware(logger),
    persistStore(db)
  )
)

render(
  e(Provider, {store}, e(App)),
  document.getElementById('root')
)
