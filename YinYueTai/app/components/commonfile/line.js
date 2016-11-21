import React,{Component} from 'react'
import {
  View,
  StyleSheet
} from 'react-native'

var Device = require('../../utils/device')
var {width,height,gray} = Device

export default class Line extends Component {

  render () {
    return (
      <View style={styles.view}>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  view: {
    height: 0.5,
    width: width,
    backgroundColor: gray
  }
})
