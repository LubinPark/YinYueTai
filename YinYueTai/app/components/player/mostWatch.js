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

var itemCount
var Device = require('../../utils/device')
const { width, height, itemWidth, gray } = Device

class MostWatch extends Component {

  static contextTypes = {
    app: React.PropTypes.object
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.props.actions.fetchPlayerIfNeeded({type: 'mostWatch', videoId:this.props.videoId})
    })
  }

  render () {

    let data = this.props.data

    if (_.isEmpty(data)) {
      return (
        <View>
        </View>
      )
    } else {
      itemCount = data.length
      let title='大部分人还看了:'
      return (
        <View style={styles.view}>
          <CommonTitle title={title} />
          <ScrollView style={styles.scrollView} horizontal={true} showsHorizontalScrollIndicator={false}>
          {
            _.map(data, (item, index) => {
              return (
                <CommonItem data={item} key={item.videoId+item.title} mostWatch={1} mostWatch_item={1}/>
              )
            })
          }
          </ScrollView>
        </View>
      )
    }
  }

}

const itemWidthNew = itemWidth + 35
const styles = StyleSheet.create({
  view: {
    width: width,
    borderBottomColor: gray,
    borderBottomWidth: StyleSheet.hairlineWidth / 2
  },
  scrollView: {
    width: itemWidthNew * itemCount,
    height: ((width - 30 ) / 2 * 0.6) + 80,
    flexWrap: 'wrap'
  }
})

export default connect(state => ({
  data: state.PlayerReducer.mostWatch
  }),
  (dispatch) => ({
    actions: bindActionCreators(PlayerAction, dispatch)
  })
)(MostWatch)
