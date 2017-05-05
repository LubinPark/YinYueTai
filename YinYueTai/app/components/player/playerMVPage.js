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

import * as PlayerAction from '../../actions/playerAction'
import Loading from '../commonfile/loading'
import VideoPage from './videoPage'
import AuthorInfo from './authorInfo'
import MostWatch from './mostWatch'
import AuthorListMV from './authorListMV'
import RelatedPlayList from './relatedPlayList'
import GuestLike from './guestLike'

var Device = require('../../utils/device')
const { width, height, purpure } = Device

class PlayerMVPage extends Component {

  static contextTypes = {
    app: React.PropTypes.object
  }

  componentDidMount() {
    //请求新数据
    InteractionManager.runAfterInteractions(() => {
      this.props.actions.fetchPlayerIfNeeded({type: 'authorInfo', videoId:this.props.videoId})
    })
  }

  render () {

    var num = _.random(0, 2)
    let videoId = this.props.videoId
    let data = this.props.data

    if (_.isEmpty(data && data.artistOtherVideos && data.relatedVideos && data.relatedPlayList)) {
      return(
        <Loading num={num}/>
      )
    } else {

      let authorInfo = data
      let artistOtherVideos = data.artistOtherVideos
      let relatedVideos = data.relatedVideos
      let relatedPlayList = data.relatedPlayList

      return (
        <View style={styles.view}>
          <StatusBar hidden={true} />
          <VideoPage url={authorInfo.url} title={authorInfo.title} cleanPLayData={()=>this.cleanPLayData()}/>
          <Image style={styles.scrollView} source={require('../../img/background/background_0.png')} resizeMode='stretch' >
            <ScrollView style={styles.scrollView}>
              <AuthorInfo data={authorInfo}/>
              <MostWatch videoId={videoId}/>
              <AuthorListMV data={artistOtherVideos}/>
              <RelatedPlayList data={relatedPlayList}/>
              <GuestLike data={relatedVideos}/>
            </ScrollView>
          </Image>
        </View>
      )
    }
  }

  cleanPLayData() {
    this.props.actions.fetchPlayerIfNeeded({type: 'cleanPLayData'})
  }

}

const styles = StyleSheet.create({
  view: {
    width: width,
    height: height
  },
  scrollView: {
    width:width,
    height: height - (width / 16 * 9)
  }
})

export default connect(state => ({
  data: state.PlayerReducer.authorInfo
  }),
  (dispatch) => ({
    actions: bindActionCreators(PlayerAction, dispatch)
  })
)(PlayerMVPage)
