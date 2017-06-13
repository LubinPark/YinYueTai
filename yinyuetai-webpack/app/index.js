import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import Root from './router'
import configureStore from './store/configureStore'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

let rootElement = document.getElementById('root')
let store = configureStore()
store.subscribe(() => {})

render(
  <Provider store={store}>
    <MuiThemeProvider>
      <Root/>
    </MuiThemeProvider>
  </Provider>, rootElement
)
