import _ from 'underscore'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  View,
  StyleSheet,
  ScrollView,
  InteractionManager
} from 'react-native'

import * as PlayerAction from '../../actions/playerAction'
import CommonTitle from '../commonfile/commonTitle'
import CommonItem from '../commonfile/commonItem'

let Device = require('../../utils/device')

const { itemHeight, width, height, gray } = Device

export default class AuthorListMV extends Component {

  static contextTypes = {
    app: React.PropTypes.object
  }

  render () {

    let data = this.props.data

    if (_.isEmpty(data)) {
      return (
        <View/>
      )
    } else {

      let title='同艺人其他MV:'

      return (
        <View style={styles.view}>
          <CommonTitle title={title} />
          <View style={styles.itemView}>
          {
            _.map(data, (item, index) => {
              return (
                <CommonItem data={item}
                            mostWatch={1}
                            key={item.videoId+item.title}/>
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
    width: width,
    borderBottomColor: gray,
    borderBottomWidth: StyleSheet.hairlineWidth / 2
  },
  itemView: {
    width: width,
    flexWrap: 'wrap',
    flexDirection:'row'
  }
})
