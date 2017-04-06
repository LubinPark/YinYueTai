import { Provider } from 'react-redux'
import React, { Component } from 'react'

import store from '../store/store'
import ConnectApp from './connectApp'

export default class Index extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectApp/>
      </Provider>
    )
  }
}
