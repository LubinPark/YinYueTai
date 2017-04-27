import React, { Component } from 'react'

import {
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native'

var Device = require('../../utils/device')
const { width, height, lightGray, gray, fadeGray } = Device

export default class ChatItem extends Component {

  render() {
    let data = this.props.data
    return (
      <View style={styles.userView}>
        <Image style={{width: 44, height: 44,marginLeft: 10}}
               source={{uri:'https://facebook.github.io/react/img/logo_og.png'}}/>
        <View style={styles.infoView}>
          <Text>{data.name}</Text>
          <Text>{data.lastMessage}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  userView: {
    width: width,
    height: 70,
    alignItems:'center',
    flexDirection:'row'
  },
  infoView: {
    padding: 10
  }
})
