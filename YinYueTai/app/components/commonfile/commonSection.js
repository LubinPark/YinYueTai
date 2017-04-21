import React, { Component } from 'react'
import _ from 'underscore'
import {
  View,
  StyleSheet,
} from 'react-native'

import CommonItem from '../commonfile/commonItem'
import MVItemTop from '../commonfile/mvItemTop'

var Device = require('../../utils/device')
const { itemWidth, width, height, gray } = Device

export default class Pop extends Component {

  render () {
    var data = this.props.data
    if (_.isEmpty(data)) {
      return (
        <View>
        </View>
      )
    } else {
      return (
        <View style={styles.view}>
          <MVItemTop title={data.title} enTitle={data.enTitle}/>
          <View style={styles.itemView}>
          {
            _.map(data.data, (item, index) => {
              return (
                <CommonItem data={item} key={item.videoId + index + item.regdate}/>
              )
            })
          }
          </View>
        </View>
      )
    }
  }

}

const styles = StyleSheet.create({
  view: {
    width:width,
    marginTop: 10,
    backgroundColor:'#ffffff'
  },
  itemView: {
    width: width,
    flexWrap: 'wrap',
    flexDirection: 'row'
  }
})
