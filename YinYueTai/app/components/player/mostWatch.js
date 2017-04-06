import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'underscore'
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
var { itemHeight, width,height } = Device

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

    var data = this.props.data

    if (_.isEmpty(data)) {
      return (
        <View>
        </View>
      )
    } else {
      itemCount = data.length
      var title='大部分人还看了:'
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

const styles = StyleSheet.create({
  view: {
    width: width
  },
  scrollView: {
    width: width / 2 * itemCount,
    height: 175,
    marginLeft: 10,
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
