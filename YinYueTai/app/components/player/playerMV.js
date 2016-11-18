import React,{Component} from 'react'
import _ from 'underscore'
import {
  View,
  StyleSheet,
  ScrollView
} from 'react-native'

import AuthorInfo from './authorInfo'

var Device = require('../../utils/device')
var {itemHeight,width,height,alpha0,lightGray} = Device

export default class PlayerMV extends Component {

  static contextTypes = {
    app: React.PropTypes.object
  }

  render () {

    const leftButtonConfig = {title: '返回', handler:()=>this.context.app.navigator.pop()}

    return (
      <View style={styles.view}>
        <View style={styles.video}>
        </View>
        <ScrollView styles={styles.scrollView}>
          <AuthorInfo />
        </ScrollView>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  view: {
    width: width,
    height: height,
    backgroundColor: '#ffffff'
  },
  video: {
    width: width,
    height: width / 16 * 9,
    backgroundColor: 'black'
  },
  scrollView: {
    width:width,
    height: height - (width / 16 * 9),
    backgroundColor: lightGray
  }
})
