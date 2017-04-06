import React, {Component} from 'react'
import {
  Platform,
  BackAndroid
} from 'react-native'

const isAndroid = (Platform.OS === 'android') ? true : false

export default class ContextWrapper extends Component {

  static childContextTypes = {
    app: React.PropTypes.object
  }

  getChildContext() {
    return {app: this.props.context}
  }

  componentDidMount() {
    if (isAndroid) {
      BackAndroid.addEventListener('hardwareBackPress', () => {
        if (this.props.context.navigator && this.props.context.navigator.getCurrentRoutes().length > 1) {
          this.props.context.navigator.pop()
          return true
        }
        return false
      })
    }
  }

  render() {
    return this.props.children
  }

}
