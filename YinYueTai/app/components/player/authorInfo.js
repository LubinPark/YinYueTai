import React,{Component} from 'react'
import _ from 'underscore'
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView
} from 'react-native'

var Device = require('../../utils/device')
var {itemHeight,width,height,alpha0,gray} = Device

export default class AuthorInfo extends Component {

  static contextTypes = {
    app: React.PropTypes.object
  }

  render () {
    return (
      <View style={styles.view}>

        <View style={styles.center}>
          <Image style={styles.authorImg} source={{uri: ''}} />
          <Text style={{marginTop: 10}}>名字</Text>
        </View>

        <View style={[styles.center,{marginBottom: 10}]}>
          <View style={styles.num}>
            <Text style={styles.center}>播放次数:123</Text>
          </View>
          <Image style={[styles.button,styles.bg]} source={{uri: ''}} />
          <Image style={[styles.button,styles.bg]} source={{uri: ''}} />
          <Image style={[styles.button,styles.bg]} source={{uri: ''}} />
          <Image style={[styles.button,styles.bg]} source={{uri: ''}} />
          <Image style={[styles.button,styles.bg]} source={{uri: ''}} />
        </View>

        <Text style={styles.desc}>123123123123123123123123123123123123123</Text>

        <View style={[styles.center,{marginTop: 10,marginBottom: 10,flexDirection:'row'}]}>
          <View style={styles.bottomLeft}>
            <Image style={[styles.loading,styles.bg]} source={{uri: ''}} />
            <Text>上传者:123</Text>
            <Image style={[styles.level,styles.bg]} source={{uri: ''}} />
          </View>

          <View style={styles.bottomRight}>
            <Image style={[styles.time,styles.bg]} source={{uri: ''}} />
            <Text>2016-11-17 10:00</Text>
          </View>

        </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  view: {
    width: width,
    backgroundColor: 'red'
  },
  center: {
    flexDirection:'row',
    alignItems:'center'
  },
  authorImg: {
    width: 66,
    height: 66,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 33,
    backgroundColor:'yellow'
  },
  num: {
    width: width / 7 * 2,
    alignItems:'center'
  },
  button: {
    marginLeft: 1,
    width:width / 7 - 2,
    height: width / 7 - 10
  },
  bg: {
    backgroundColor:'yellow'
  },
  desc: {
    marginLeft:10
  },
  loading: {
    width: 20,
    height: 20,
    marginLeft: 10,
    marginRight: 5,
    borderRadius: 10
  },
  level: {
    width: 15,
    height: 15,
    marginLeft: 5
  },
  bottomLeft: {
    alignItems:'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  bottomRight: {
    flex: 1,
    marginTop: 3,
    marginRight: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  time: {
    width: 15,
    height: 15,
    marginRight: 10,
    borderRadius: 15 / 2
  }
})
