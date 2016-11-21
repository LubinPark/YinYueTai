import React,{Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import _ from 'underscore'
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  InteractionManager
} from 'react-native'

import TopView from './topView'
import Loop from './loop'
import SelectButton from './selectButton'
import MVFirst from './mvFirst'
import Pop from './pop'
import Fans from './fans'
import Anthor from './anthor'
import Panorama from './panorama'
import Musicer from './musicer'
import Guess from './guess'
import * as HomeAction from '../../actions/homeAction'

var Device = require('../../utils/device')
var {width,height,purpure} = Device

class Home extends Component {

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.props.actions.fetchHomeIfNeeded()
    })
  }

  render() {

    var data = this.props.data

    if (_.isEmpty(data.loop&&data.button&&data.pops&&data.fans&&data.anthor&&data.panorama&&data.musicer&&data.guess)) {
      return (
        <View style={styles.loadingView}>
          <Image style={styles.loading} source={require('../../img/loading.gif')} />
        </View>
      )
    } else {
      return (
         <View>
          <TopView />
          <ScrollView style={styles.scrollView}>
            <Loop data={data.loop} />
            <SelectButton data={data.button} />
            <MVFirst data={data.mvFirst} />
            <Pop data={data.pops} />
            <Fans data={data.fans} />
            <Anthor data={data.anthor} />
            <Panorama data={data.panorama} />
            <Musicer data={data.musicer} />
            <Guess data={data.guess} />
          </ScrollView>
        </View>
      )
    }
  }

}

const styles = StyleSheet.create({
  scrollView: {
    width: width,
    height: height - 64 - 49,
  },
  loadingView: {
    width: width,
    height: height - 49,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: purpure
  },
  loading:{
    width: 100,
    height: 100
  }
})

export default connect(state => ({
  data: state.HomeReducer
  }),
  (dispatch) => ({
    actions: bindActionCreators(HomeAction, dispatch)
  })
)(Home)
