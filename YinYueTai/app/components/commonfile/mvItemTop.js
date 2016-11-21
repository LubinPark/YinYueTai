import React,{Component} from 'react'
import {
  Text,
  View,
  StyleSheet
} from 'react-native'

var Device = require('../../utils/device')
var {width,height,gray,black} = Device

export default class MVItemTop extends Component {

  render () {
    var title = this.props.title
    var enTitle = this.props.enTitle
    return (
      <View style={styles.view}>
        <View style={styles.titleView}>
          <View><Text style={styles.title}>{title}</Text></View>
          <View><Text style={styles.desc}>{enTitle}</Text></View>
        </View>
        <View style={styles.moreView}>
          <View><Text style={styles.more}>MORE ></Text></View>
        </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  view: {
    width:width - 20,
    height:40,
    marginLeft: 10,
    flexDirection:'row'
  },
  titleView: {
    width:width / 2,
    justifyContent: 'center'
  },
  title: {
    fontSize: 12,
    color:black
  },
  desc: {
    fontSize: 9,
    color: gray
  },
  moreView: {
    flex: 1,
    marginRight: 10,
    alignItems:'flex-end',
    justifyContent: 'center'
  },
  more: {
    fontSize:11,
    fontWeight :'400',
    color: gray
  }
})
