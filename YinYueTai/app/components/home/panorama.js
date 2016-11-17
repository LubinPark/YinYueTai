import React,{Component} from 'react'
import _ from 'underscore'
import {
  View,
  StyleSheet
} from 'react-native'

import CommonItem from './commonItem'
import MVItemTop from './mvItemTop'

var Device = require('../../utils/device')
var {itemHeight,width,height} = Device

export default class Panorama extends Component {

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
                <CommonItem  data={item} key={item.videoId}/>
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
    flex:1,
    width:width,
    marginTop:1,
    marginBottom:1,
    backgroundColor:'#ffffff'
  },
  itemView :{
    marginLeft: 10,
    height: itemHeight * 3 + 40,
    width: width - 10,
    flexWrap: 'wrap'
  }
})
