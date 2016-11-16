import React, {Component} from 'react'
import {Provider} from 'react-redux'

import store from '../store/store'
import ConnectApp from './connectApp'

export default class Index extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectApp />
      </Provider>
    )
  }
}
