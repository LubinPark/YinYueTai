import _ from 'underscore'
import React, { Component } from 'react'

import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

var Device = require('../../utils/device')
const { itemHeight, width, height, gray, green } = Device

export default class CommonItem extends Component {

  static contextTypes = {
    app: React.PropTypes.object
  }

  render () {

    var data = this.props.data

    if (_.isEmpty(data)) {
      return (
        <View>
        </View>
      )
    } else {
      return (
          <View style={[styles.items]}>
            <TouchableOpacity onPress={()=>this._goToPlayer(data.videoId)}>
              <Image source={{uri: data.posterPic}} style={styles.img} />
              <View style={styles.info}>
                <Text style={styles.title} allowFontScaling={false} numberOfLines={1}>{data.title}</Text>
                <Text style={styles.author} allowFontScaling={false} numberOfLines={1}>{data.creator.nickName}</Text>
                <Text style={styles.num} allowFontScaling={false} numberOfLines={1}>播放数量:{data.totalView}</Text>
              </View>
            </TouchableOpacity>
          </View>
      )
    }
  }

  _goToPlayer(videoId){
    this.context.app.navigator.push({
      id:'PlayerMV',
      data: {
        videoId: videoId
      }
    })
  }

}

const widthImg = (width - 40) / 3
const styles = StyleSheet.create({
  items: {
    width: widthImg,
    marginRight: 10,
    marginBottom: 10
  },
  img: {
    width: widthImg,
    height: widthImg,
    borderRadius: 4,
    marginBottom: 10
  },
  info: {
    margin: 0
  },
  title:{
    fontSize: 12,
    marginBottom: 5,
    color: '#ffffff',
  },
  author: {
    width: widthImg - 20,
    fontSize: 11,
    color: green,
    marginBottom: 5,
  },
  num: {
    fontSize:10,
    marginBottom: 5,
    color: gray
  },
  moreView: {
    alignItems:'flex-end'
  },
  more: {
    color: gray
  }
})
