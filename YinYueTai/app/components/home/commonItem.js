import React,{Component} from 'react'
import {
  Text,
  View,
  Image,
  StyleSheet
} from 'react-native'

var Device = require('../../utils/device')
var {width,height,black,gray,green,imageWidth} = Device

export default class CommonItem extends Component {

  render () {
    var data = this.props.data
    return (
      <View style={styles.item}>
        <Image source={{uri: data.posterPic}} style={styles.img} />
          <View style={styles.info}>
            <Text style={styles.title} numberOfLines={1}>{data.title}</Text>
            <Text style={styles.name}>姓名</Text>
            <Text style={styles.num}>播放数量:{data.totalView}</Text>
          </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  item: {
    width:((width - 10) - 20 ) / 2,
    marginRight: 10,
    marginBottom: 10,
    backgroundColor:'#ffffff'
  },
  img: {
    height:imageWidth,
    borderRadius: 3,
    marginBottom: 10
  },
  info: {
    marginLeft: 10
  },
  title:{
    fontSize: 12,
    marginBottom: 5,
    color: black
  },
  name: {
    fontSize: 11,
    color: green,
    marginBottom: 5,
  },
  num: {
    fontSize:10,
    color: gray
  }
})
