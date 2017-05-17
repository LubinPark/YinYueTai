import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import Router from './router'
import configureStore from './store/configureStore'

let rootElement = document.getElementById('root')
let store = configureStore()
store.subscribe(() => {})

render(
  <Provider store={store}>
    <Router/>
  </Provider>, rootElement
)
