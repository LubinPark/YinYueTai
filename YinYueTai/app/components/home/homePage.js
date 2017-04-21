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

import * as HomeAction from '../../actions/homeAction'

import Loading from '../commonfile/loading'
import TopView from './topView'
import Loop from './loop'
import SelectButton from './selectButton'
import CommonSection from '../commonfile/commonSection'

var Device = require('../../utils/device')
const { width, height, fadeGray } = Device

class HomePage extends Component {

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.props.actions.fetchHomeIfNeeded()
    })
  }

  render() {

    var num = _.random(0, 2)
    let data = this.props.data
    let isEmptyData = data.loop&&data.button&&data.data

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
            {
              _.map(data.data, (item, index) => {
                return (
                  <CommonSection data ={item} key={index}/>
                )
              })
            }
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
    backgroundColor: fadeGray
  }
})

export default connect(state => ({
  data: state.HomeReducer
  }),
  (dispatch) => ({
    actions: bindActionCreators(HomeAction, dispatch)
  })
)(HomePage)
