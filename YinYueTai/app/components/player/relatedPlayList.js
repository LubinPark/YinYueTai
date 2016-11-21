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
import CommonItem from '../commonfile/commonItem'

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
                <CommonItem data={item} key={item.videoId+item.title} mostWatch={1} RelatedPlayList={1}/>
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
    width: width
  },
  itemView: {
    marginLeft: 10,
    height: itemHeight * 2 + 40,
    width: width - 10,
    flexWrap: 'wrap'
  }
})
