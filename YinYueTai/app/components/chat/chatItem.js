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
      <View style={[styles.userView,styles.border]}>
        <Image style={styles.userHeaderImg}
               source={{uri:'https://facebook.github.io/react/img/logo_og.png'}}/>
        <View style={styles.infoView}>
          <Text allowFontScaling={false} numberOfLines={1} style={styles.name}>{data.name}</Text>
          <Text allowFontScaling={false} numberOfLines={1} style={styles.lastMessage}>{data.lastMessage}</Text>
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
    borderRadius: 4
  },
  border: {
    borderBottomColor: gray,
    borderBottomWidth: StyleSheet.hairlineWidth
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
