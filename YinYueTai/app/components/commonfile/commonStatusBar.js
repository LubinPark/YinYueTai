import React, { Component } from 'react'
import { StatusBar } from 'react-native'

export default class CommonStatusBar extends Component {

  render() {
    return (
      <StatusBar barStyle="light-content" animated={true}/>
    )
  }
}
