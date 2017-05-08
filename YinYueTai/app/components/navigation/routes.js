import React, { Component } from 'react'

import {
  Text,
  View,
  Navigator,
  StyleSheet
} from 'react-native'

import TabBarApp from '../../container/tabBarApp'
import ContextWrapper from './contextWrapper'

import LoginPage from '../user/loginPage'
import RegisterPage from '../user/registerPage'
import PlayerMVPage from '../player/playerMVPage'
import MessagePage from '../message/messagePage'

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
      case 'PlayerMVPage':
        return <ContextWrapper {...contextProps}><PlayerMVPage {...viewProps} /></ContextWrapper>
      case 'LoginPage':
        return <ContextWrapper {...contextProps}><LoginPage {...viewProps} /></ContextWrapper>
      case 'RegisterPage':
        return <ContextWrapper {...contextProps}><RegisterPage {...viewProps} /></ContextWrapper>
      case 'MessagePage':
        return <ContextWrapper {...contextProps}><MessagePage {...viewProps} /></ContextWrapper>
    }
    return <View style={styles.errorView}><Text>{route.id} page is not found.</Text></View>
  }

  static configureScene(route) {
    return Navigator.SceneConfigs.PushFromRight
  }

}

const styles = StyleSheet.create({
  errorView: {
    top: 100,
    alignItems: 'center',
    justifyContent:'center'
  }
})
