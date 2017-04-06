import React, { Component, PropTypes } from 'react'
import { Navigator } from 'react-native'
import Routes from '../components/navigation/routes'
import AV from '../actions/AV'

export default class AppIndex extends Component {

  static contextTypes = {
    app: React.PropTypes.object
  }

  render() {

    var initialRoute
    var pageContext = {rootNavigator: this.props.rootNavigator}
    var currentUser = AV.User.currentAsync()

    if (currentUser) {
      initialRoute = { id: 'TabBarApp' }
    } else {
      initialRoute = { id: 'LoginPage' }
    }

    return (
      <Navigator
        ref={v => this.hostNavigator = v}
        initialRoute={initialRoute}
        configureScene={Routes.configureScene}
        renderScene={(route, navigator) => Routes.renderScene(route, navigator, pageContext, this.props)}
      />
    )
  }

}
