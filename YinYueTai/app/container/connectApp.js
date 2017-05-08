import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import React, { Component, PropTypes } from 'react'
import { View, StatusBar, Navigator } from 'react-native'

import Routes from '../components/navigation/routes'
import * as TabBarAction from '../actions/tabBarAction'

class AppIndex extends Component {

  static contextTypes = {
    app: React.PropTypes.object
  }

  componentWillMount() {
    this.props.actions.fetchTabBarIfNeeded({type: 'initialRoute'})
  }

  render() {
    let route = this.props.data.route
    if (route !== '') {
      let pageContext  = {rootNavigator: this.props.rootNavigator}
      let initialRoute = {id: route}
      return (
        <View style={{flex: 1}}>
          <StatusBar barStyle="light-content" animated={true}/>
          <Navigator
            ref={v => this.hostNavigator = v}
            initialRoute={initialRoute}
            configureScene={Routes.configureScene}
            renderScene={(route, navigator) => Routes.renderScene(route, navigator, pageContext, this.props)}
          />
        </View>
      )
    } else {
      return null
    }
  }

}

export default connect(state => ({
  data: state.TabBarReducer
  }),
  (dispatch) => ({
    actions: bindActionCreators(TabBarAction, dispatch)
  })
)(AppIndex)
