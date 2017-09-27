import React, { Component } from 'react'

import {
  Text,
  View,
  StyleSheet
} from 'react-native'

let Device = require('../../utils/device')
const { width, height, gray, alpha0 } = Device

export default class CommomTitle extends Component {

  render () {

    let title = this.props.title

    return (
      <View style={styles.view}>
        <View style={styles.titleView}>
          <View>
            <Text style={styles.title}
                  allowFontScaling={false}
                  numberOfLines={1}>{title}</Text>
          </View>
        </View>
        <View style={styles.moreView}>
          <View>
            <Text style={styles.more}
                  allowFontScaling={false}
                  numberOfLines={1}>更多 》</Text>
          </View>
        </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  view: {
    width:width,
    height: 50,
    marginLeft: 10,
    flexDirection:'row'
  },
  titleView: {
    width:width / 2,
    justifyContent: 'center',
    backgroundColor: alpha0
  },
  title: {
    fontSize: 13,
    color: gray
  },
  moreView: {
    flex: 1,
    marginRight: 10,
    backgroundColor: alpha0,
    alignItems:'flex-end',
    justifyContent: 'center'
  },
  more: {
    fontSize:12,
    fontWeight :'400',
    color: gray
  }
})
