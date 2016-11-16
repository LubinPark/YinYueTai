import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import React, { Component } from 'react'
import { createStore,applyMiddleware } from 'redux'

import store from '../store/store'
import ConnectApp from './connectApp'
import rootReducer from '../reducers/rootReducer'

export default class Index extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectApp/>
      </Provider>
    )
  }
}
