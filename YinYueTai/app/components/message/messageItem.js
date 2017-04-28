import _ from 'underscore'
import React, { Component } from 'react'

import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native'

var Device = require('../../utils/device')
const { width, height, fadeGray, fadeGreen } = Device

export default class MessageItem extends Component {

  static contextTypes = {
    app: React.PropTypes.object
  }

  render() {

    let data = this.props.data
    let uri = data.uri
    let messages = data.text

    if (data.position == 'left') {
      return (
        <View style={[styles.container,{flexDirection:'row'}]}>
          <Image style={styles.headerImg}
                 source={{uri: uri}} />
          <Image style={styles.messageSendView}
                 source={require('../../img/messageleft.png')} />
          <View style={styles.infoView}>
            <View style={styles.textStyle}>
              <Text style={styles.messageText} allowFontScaling={false}>{messages}</Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.flexText}></Text>
            </View>
          </View>
          <View style={styles.writeView}></View>
        </View>
      )
    } else if (data.position == 'right') {
      return (
        <View style={[styles.container,{flexDirection:'row-reverse'}]}>
          <Image style={styles.headerImg}
                 source={{uri: uri}} />
          <Image style={[styles.messageSendView,{tintColor:fadeGreen}]}
                 source={require('../../img/messageright.png')} />
          <View style={[styles.infoView,{justifyContent:'flex-end'}]}>
            <View style={[styles.textStyle,styles.self]}>
              <Text style={styles.messageText}>{messages}</Text>
            </View>
          </View>
          <View style={styles.writeView}></View>
        </View>
      )
    } else {
      return (
        <View style={styles.container}></View>
      )
    }
  }

}

const styles = StyleSheet.create({
  container: {
    width: width,
    padding: 10,
    backgroundColor:'transparent'
  },
  headerImg: {
    width: 40,
    height: 40,
    backgroundColor:'transparent'
  },
  messageSendView: {
    position: 'absolute',
    left: 45,
    top: 16,
    width: 25,
    height: 25
  },
  infoView: {
    width: width - 100,
    minHeight: 30,
    marginLeft: 10,
    marginRight: 10,
    alignItems:'center',
    flexDirection: 'row',
    backgroundColor:'transparent'
  },
  messageText: {
    padding: 8,
    fontSize: 14,
    lineHeight: 20,
    borderRadius: 10,
    backgroundColor:'transparent'
  },
  textStyle: {
    borderRadius: 5,
    backgroundColor: fadeGray
  },
  self: {
    backgroundColor: fadeGreen
  },
  writeView: {
    flex: 1
  },
  flexText: {
    flex: 1
  }
})
