import React,{Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import _ from 'underscore'
import {
  View,
  StyleSheet,
  ScrollView,
  InteractionManager
} from 'react-native'

import * as PlayerAction from '../../actions/playerAction'
import CommonTitle from '../commonfile/commonTitle'
import PlayerMVCllectionItem from '../commonfile/playerMVCllectionItem'

var Device = require('../../utils/device')
var {itemHeight, width,height} = Device

export default class RelatedPlayList extends Component {

  static contextTypes = {
    app: React.PropTypes.object
  }

  render () {

    var data = this.props.data

    if (_.isEmpty(data)) {
      return (
        <View>
        </View>
      )
    } else {
      var title='收录该MV的悦单:'
      return (
        <View style={styles.view}>
          <CommonTitle title={title} />
          <View style={styles.itemView}>
          {
            _.map(data, (item, index) => {
              return (
                <PlayerMVCllectionItem data={item} key={item.videoId+item.title} />
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
    height: 220,
  },
  itemView: {
    marginLeft: 10,
    height: 200,
    width: width - 10,
    flexDirection: 'row'
  }
})
