import React, { Component } from 'react'

import {
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native'

let Device = require('../../utils/device')

const { width, height } = Device

export default class ChatItem extends Component {

  render() {

    let data = this.props.data
    let img = !!data.get('userPic') ? {uri:data.get('userPic').get('url')} : ''

    return (
      <View style={styles.userView}>
        <Image style={styles.userHeaderImg}
               defaultSource={ require('../../img/userhead.png')}
               source={img}/>
        <Text allowFontScaling={false}
              numberOfLines={1}
              style={styles.name}>
          {data.get('username')}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  userView: {
    width: width,
    alignItems:'center',
    flexDirection:'row'
  },
  userHeaderImg: {
    width: 44,
    height: 44,
    marginLeft: 10,
    marginRight: 10,
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
