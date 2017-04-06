import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'underscore'
import {
  View,
  Image,
  StatusBar,
  StyleSheet,
  ScrollView,
  InteractionManager
} from 'react-native'

import Loading from '../commonfile/loading'
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
var { width, height, purpure } = Device

class Home extends Component {

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.props.actions.fetchHomeIfNeeded()
    })
  }

  render() {

    var num = _.random(0, 2)
    var data = this.props.data
    var isEmptyData = data.loop&&data.button&&data.pops&&data.fans&&data.anthor&&data.panorama&&data.musicer&&data.guess

    if (_.isEmpty(isEmptyData)) {
      return (
        <Loading num={num}/>
      )
    } else {
      return (
         <View>
         <StatusBar barStyle="light-content"/>
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
    height: height - 64 - 49
  }
})

export default connect(state => ({
  data: state.HomeReducer
  }),
  (dispatch) => ({
    actions: bindActionCreators(HomeAction, dispatch)
  })
)(Home)
