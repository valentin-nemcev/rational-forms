import { omit } from 'ramda'
import { Map } from 'immutable'
import { createAction, handleAction } from 'redux-actions'
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
      handleAction(
        'LOAD_STATE',
        (state, {payload}) => state.merge(payload),
        Map
      )
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
