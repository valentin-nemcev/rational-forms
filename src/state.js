import { createAction, createReducer } from 'redux-act'
import { combineReducers } from 'redux-immutable'
import { Record, Map } from 'immutable'

export function pickState (...keys) {
  return state => keys.reduce(
    (o, key) => { o[key] = state.get(key); return o },
    {}
  )
}

export const updateAnswer = createAction(
  'UPDATE_ANSWER',
  (key, answer) => ({key, answer})
)

export const updateExample = createAction('UPDATE_EXAMPLE')

const State = Record({
  example: undefined,
  answers: undefined
})

export default combineReducers({

  example: createReducer({
    [updateExample]: (state, payload) => payload
  }, 'Your example'),

  answers: createReducer({
    [updateAnswer]:
      (answers, {key, answer}) => answers.set(key, answer)
  }, Map())

}, State)
