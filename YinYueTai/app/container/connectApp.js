import React, {Component, PropTypes} from 'react'
import {Navigator} from 'react-native'
import Routes from '../components/navigation/routes'

export default class AppIndex extends Component {

  static contextTypes = {page: React.PropTypes.object}

  render() {

    var initialRoute = {id: 'TabBarApp'}
    var pageContext = {rootNavigator: this.props.rootNavigator}

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
