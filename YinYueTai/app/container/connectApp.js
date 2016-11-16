import React, {Component} from 'react'
import AppIndex from './appIndex'

export default class ConnectApp extends Component {
  render() {
    return (
      <AppIndex {...this.props} />
    )
  }
}
