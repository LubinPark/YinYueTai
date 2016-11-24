import React,{Component} from 'react'
import _ from 'underscore'
import {
  View,
  Image,
  StyleSheet
} from 'react-native'

var Device = require('../../utils/device')
var {width,height,purpure,darkGreen} = Device

export default class Home extends Component {

  render() {

    var num = this.props.num

    if (num == 0) {
      var color = {backgroundColor: purpure}
      return (
        <View style={[styles.loadingView,color]}>
          <Image style={styles.loading} source={require('../../img/loading/loading_0.gif')} />
        </View>
      )
    } else if (num == 1) {
      var color = {backgroundColor: 'black'}
      return (
        <View style={[styles.loadingView,color]}>
          <Image style={styles.loading} source={require('../../img/loading/loading_1.gif')} />
        </View>
      )
    } else {
      var color = {backgroundColor: darkGreen}
      return(
        <View style={[styles.loadingView,color]}>
          <Image style={styles.loading} source={require('../../img/loading/loading_2.gif')} />
        </View>
      )
    }
  }

}

const styles = StyleSheet.create({
  loadingView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  loading:{
    width: 100,
    height: 100
  }
})
