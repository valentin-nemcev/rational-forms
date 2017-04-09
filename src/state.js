import { createAction, handleActions } from 'redux-actions'

export const updateExample = createAction('UPDATE_EXAMPLE')

export default handleActions({
  UPDATE_EXAMPLE: (state, action) => ({
    ...state,
    example: action.payload
  })
}, {example: 'Your example'})
