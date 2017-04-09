import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import 'normalize.css/normalize.css'

import App from './App'
import state from './state'

const store = createStore(state)

render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('root')
)
