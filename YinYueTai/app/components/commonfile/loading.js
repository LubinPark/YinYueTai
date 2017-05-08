import _ from 'underscore'
import React, { Component } from 'react'

import {
  View,
  Image,
  StyleSheet,
  ActivityIndicator
} from 'react-native'

var Device = require('../../utils/device')
const { width, height, purpure, darkGreen, darkGray, isAndroid } = Device

export default class Home extends Component {

  render() {

    let num = this.props.num

    if (isAndroid) {
      return (
        <View style={[styles.loadingView,{backgroundColor: '#fff'}]}>
          <ActivityIndicator animating={true} color={darkGray}/>
        </View>
      )
    } else {
      if (num == 0) {
        var color = {backgroundColor: purpure}
        return (
          <View style={[styles.loadingView,color]}>
            <Image style={styles.loading} source={require('../../img/loading/loading_0.gif')} />
          </View>
        )
      } else if (num == 1) {
        var color = {backgroundColor: 'black'}
        return (
          <View style={[styles.loadingView,color]}>
            <Image style={styles.loading} source={require('../../img/loading/loading_1.gif')} />
          </View>
        )
      } else {
        var color = {backgroundColor: darkGreen}
        return(
          <View style={[styles.loadingView,color]}>
            <Image style={styles.loading} source={require('../../img/loading/loading_2.gif')} />
          </View>
        )
      }
    }
  }

}

const styles = StyleSheet.create({
  loadingView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  loading:{
    width: 100,
    height: 100
  }
})
