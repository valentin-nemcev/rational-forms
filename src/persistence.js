import { omit } from 'ramda'
import { createAction, createReducer } from 'redux-act'
import reduceReducers from 'reduce-reducers'

const loadState = createAction('LOAD_STATE')

const replace = (db, id, state) =>
  db.get(id)
    .catch(err => err.name === 'not_found'
      ? Promise.resolve({_id: id})
      : Promise.reject(err)
    )
    .then(doc => db.put({...doc, ...state}))

export default db => createStore => (reducer, state) => {
  const store = createStore(
    reduceReducers(
      reducer,
      createReducer({
        [loadState]: (state, payload) => state.merge(payload)
      })
    ),
  )

  let p = Promise.resolve()

  store.subscribe(() => {
    p = p.then(() => replace(db, 'state', store.getState().toJS()))
  })

  db.get('state')
    .then(doc => store.dispatch(loadState(omit(['_id', '_rev'], doc))))

  return store
}
