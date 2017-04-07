import React, { Component } from 'react'
import _ from 'underscore'
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

var Device = require('../../utils/device')
const { itemHeight, width, height, lightGray, alpha0 } = Device

export default class SelectButton extends Component {

  render() {
    var data = this.props.data
    if (_.isEmpty(data)) {
      return (
        <View>
        </View>
      )
    } else {
      return (
        <View style={styles.view}>
        {
          _.map(data, (item, index) => {
            return (
              <TouchableOpacity  key={item.icon}>
                <View style={styles.item}>
                  <Image source={{uri:item.icon}} style={styles.button} />
                  <Text style={styles.title}>{item.title}</Text>
                </View>
              </TouchableOpacity>
            )
          })
        }
        </View>
      )
    }
  }

}

const styles = StyleSheet.create({
  view: {
    width: width,
    height: width / 3 - 2,
    flexDirection: 'row',
    backgroundColor:'#ffffff'
  },
  item: {
    width:width / 3,
    height:width / 3,
    alignItems:'center',
    justifyContent:'center'
  },
  button: {
    width:width / 7,
    height:width / 7,
    flexWrap: 'wrap'
  },
  title: {
    color: lightGray,
    fontSize: 11,
    marginTop: 10,
    alignItems: 'center',
    backgroundColor: alpha0
  }
})
