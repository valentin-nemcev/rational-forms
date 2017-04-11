import { omit } from 'ramda'
import { Map } from 'immutable'
import { createElement as e } from 'react'
import { render } from 'react-dom'
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import { createLogger } from 'redux-logger'
import { createAction, handleAction } from 'redux-actions'
import reduceReducers from 'reduce-reducers'
import PouchDB from 'pouchdb'

import 'normalize.css/normalize.css'

import App from './App'
import reduce from './state'

// For PouchDB Inspector
window.PouchDB = PouchDB

const db = new PouchDB('rational-forms')
PouchDB.debug.enable('pouchdb:api')

const replace = (db, id, state) =>
  db.get(id)
    .catch(err => err.name === 'not_found'
      ? Promise.resolve({_id: id})
      : Promise.reject(err)
    )
    .then(doc => db.put({...doc, ...state}))

const logger = createLogger({
  stateTransformer: (state) => state.toJS()
})

const loadState = createAction('LOAD_STATE')

const store = createStore(
  reduceReducers(
    reduce,
    handleAction(
      'LOAD_STATE',
      (state, {payload}) => state.merge(payload),
      Map
    )
  ),
  applyMiddleware(logger)
)

let p = Promise.resolve()

store.subscribe(() => {
  p = p.then(() => replace(db, 'state', store.getState().toJS()))
})

db.get('state')
  .then(doc => store.dispatch(loadState(omit(['_id', '_rev'], doc))))

render(
  e(Provider, {store}, e(App)),
  document.getElementById('root')
)
