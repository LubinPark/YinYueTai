import React, {Component} from 'react'
import {Text, View, Navigator} from 'react-native'

import TabBarApp from '../../container/tabBarApp'
import ContextWrapper from './contextWrapper'

import PlayerMV from '../player/playerMV'
import LoginPage from '../user/loginPage'

export default class Routes {

  static renderScene(route, navigator, context, props ={}) {

    if (route.component) {
      return route.component
    }

    var newContext = Object.assign({}, context, {navigator})
    var contextProps = {context: newContext}
    var viewProps = props

    if (route.data) {
      viewProps = Object.assign({}, viewProps, route.data)
    }

    switch (route.id) {
      case 'TabBarApp':
        return <ContextWrapper {...contextProps}><TabBarApp {...viewProps} /></ContextWrapper>
      case 'PlayerMV':
        return <ContextWrapper {...contextProps}><PlayerMV {...viewProps} /></ContextWrapper>
      case 'LoginPage':
        return <ContextWrapper {...contextProps}><LoginPage {...viewProps} /></ContextWrapper>
    }
    return <View style={{top: 100}}><Text>{route.id} page is not found.</Text></View>
  }

  static configureScene(route) {
    return Navigator.SceneConfigs.FloatFromRight
  }

}
