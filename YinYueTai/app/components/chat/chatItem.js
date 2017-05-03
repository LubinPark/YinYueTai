import React, { Component } from 'react'

import {
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native'

var Device = require('../../utils/device')
const { width, height, lightGray, gray, fadeGray, border } = Device

export default class ChatItem extends Component {

  render() {

    let data = this.props.data
    let img = data.get('userPic') ? data.get('userPic').get('url') : ''

    return (
      <View style={[styles.userView,border]}>
        <Image style={styles.userHeaderImg}
               source={{uri:img}}/>
        <View style={styles.infoView}>
          <Text allowFontScaling={false} numberOfLines={1} style={styles.name}>{data.get('username')}</Text>
          <Text allowFontScaling={false} numberOfLines={1} style={styles.lastMessage}>{this.props.lastMessage}</Text>
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
  userHeaderImg: {
    width: 44,
    height: 44,
    marginLeft: 10,
    borderRadius: 4,
    backgroundColor: '#fff'
  },
  infoView: {
    padding: 10
  },
  name: {
    fontSize: 15,
    color: 'black',
    marginBottom: 8,
  },
  lastMessage: {
    fontSize: 13,
    color: 'gray'
  }
})
