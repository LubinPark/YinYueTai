import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet
} from 'react-native'

var Device = require('../../utils/device')
var { width, height, gray, black, alpha0 } = Device

export default class CommomTitle extends Component {

  render () {
    var title = this.props.title
    return (
      <View style={styles.view}>
        <View style={styles.titleView}>
          <View><Text style={styles.title}>{title}</Text></View>
        </View>
        <View style={styles.moreView}>
          <View><Text style={styles.more}>更多 》</Text></View>
        </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  view: {
    width:width,
    height:40,
    marginLeft: 10,
    flexDirection:'row'
  },
  titleView: {
    width:width / 2,
    justifyContent: 'center',
    backgroundColor: alpha0
  },
  title: {
    fontSize: 13,
    color: gray
  },
  moreView: {
    flex: 1,
    marginRight: 10,
    backgroundColor: alpha0,
    alignItems:'flex-end',
    justifyContent: 'center'
  },
  more: {
    fontSize:12,
    fontWeight :'400',
    color: gray
  }
})
