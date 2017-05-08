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
const { itemWidth, width, height, black, gray, green, alpha0 } = Device

export default class CommonItem extends Component {

  static contextTypes = {
    app: React.PropTypes.object
  }

  constructor(props) {
    super(props)
    this.state = {
      data: this.props.data,
      mostWatch: this.props.mostWatch,
      mostWatch_item: this.props.mostWatch_item
    }
  }

  render () {

    var data = this.state.data

    if (_.isEmpty(data)) {
      return (
        <View>
        </View>
      )
    } else {

      let mostWatch = this.state.mostWatch
      let mostWatch_item = this.state.mostWatch_item

      var titleWhitestyle
      var backgroundColor
      var items = { width:itemWidth }

      //判断，改变背景和标题颜色
      if (mostWatch === 1) {
        backgroundColor = {backgroundColor: alpha0},
        titleWhitestyle  = {color: '#ffffff'}
      } else {
        backgroundColor = {backgroundColor: '#ffffff'}
      }

      //判断更改item的宽度
      if (mostWatch_item === 1) {
        items = { width:itemWidth + 35 }
      }

      return (
        <View style={[styles.items,backgroundColor,items]}>
          <TouchableOpacity onPress={()=>this._goToPlayer(data.videoId, data.posterPic)}>
            <Image source={{uri: data.posterPic}} style={[styles.img,items]} />
            <View>
              <Text style={[styles.title,titleWhitestyle]} allowFontScaling={false} numberOfLines={1}>{data.title}</Text>
              {this._showName(data)}
              <Text style={styles.num} allowFontScaling={false} numberOfLines={1}>播放数量:{data.totalView}</Text>
            </View>
          </TouchableOpacity>
        </View>
      )
    }
  }

  _showName(data) {
    let name = ''
    _.map(data.artists,(item, index) => {
      var tempName = item.artistName
      name = name + tempName
    })

    return(
      <View style={{flexDirection:'row'}}>
        <Text style={styles.name} allowFontScaling={false} numberOfLines={1}>{name}</Text>
      </View>
    )
  }

  _goToPlayer(videoId, posterPic) {
    this.context.app.navigator.push({
      id:'PlayerMVPage',
      data: {
        videoId: videoId,
        posterPic: posterPic
      }
    })
  }

}

const styles = StyleSheet.create({
  items: {
    height: itemWidth * 0.6 + 40 + 30,
    marginLeft: 10,
    marginBottom: 10,
  },
  img: {
    width:itemWidth,
    height:itemWidth * 0.6,
    borderRadius: 4,
    marginBottom: 15
  },
  title:{
    fontSize: 12,
    marginBottom: 5,
    color: black,
  },
  name: {
    width: itemWidth - 30,
    fontSize: 11,
    fontWeight: '500',
    color: gray,
    marginBottom: 5,
  },
  num: {
    fontSize:10,
    marginBottom: 10,
    color: gray
  }
})
