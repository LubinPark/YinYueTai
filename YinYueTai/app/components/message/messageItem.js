import _ from 'underscore'
import React, { Component } from 'react'

import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native'

var Device = require('../../utils/device')
const { width, height, fadeGray } = Device

export default class MessageItem extends Component {

  static contextTypes = {
    app: React.PropTypes.object
  }

  constructor(props) {
    super(props)
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
            <Text style={styles.messageText} allowFontScaling={false}>{messages}</Text>
            <Text style={styles.flexText}></Text>
          </View>
          <View style={styles.writeView}></View>
        </View>
      )
    } else if (data.position == 'right') {
      return (
        <View style={[styles.container,{flexDirection:'row-reverse'}]}>
          <Image style={styles.headerImg}
                source={{uri: uri}} />
          <Image style={styles.messageSendView}
                 source={require('../../img/messageright.png')} />
          <View style={[styles.infoView]}>
            <Text style={styles.flexText} allowFontScaling={false}></Text>
            <Text style={styles.messageText}>{messages}</Text>
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
    borderRadius: 4,
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
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'center',
  },
  messageText: {
    padding: 8,
    textAlign: 'right',
    fontSize: 15,
    lineHeight: 20,
    borderRadius: 10,
    backgroundColor:fadeGray
  },
  writeView: {
    // width:
    flex: 1,
  },
  flexText: {
    flex: 1
  }
})
