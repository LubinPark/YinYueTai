import React, {Component} from 'react'
import {Text, View} from 'react-native'

import TabBarApp from '../../container/tabBarApp'
import ContextWrapper from './contextWrapper'

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
    }
    return <View style={{top: 100}}><Text>{route.id} page is not found.</Text></View>
  }

}
