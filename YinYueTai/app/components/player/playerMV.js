import React,{Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import _ from 'underscore'
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  InteractionManager
} from 'react-native'

import * as PlayerAction from '../../actions/playerAction'
import VideoPage from './videoPage'
import Line from '../commonfile/line'
import AuthorInfo from './authorInfo'
import MostWatch from './mostWatch'
import AuthorListMV from './authorListMV'
import RelatedPlayList from './relatedPlayList'
import GuestLike from './guestLike'

var Device = require('../../utils/device')
var {width,height,purpure} = Device

class PlayerMV extends Component {

  static contextTypes = {
    app: React.PropTypes.object
  }

  componentDidMount() {
    //清空data
    this.props.actions.fetchPlayerIfNeeded({type: 'null'})
    //请求新数据
    InteractionManager.runAfterInteractions(() => {
      this.props.actions.fetchPlayerIfNeeded({type: 'authorInfo', videoId:this.props.videoId})
    })
  }

  render () {

    var videoId = this.props.videoId
    var data = this.props.data

    if (_.isEmpty(this.props.data)) {
      return(
        <View style={styles.loadingView}>
          <Image style={styles.loading} source={require('../../img/loading.gif')} />
        </View>
      )
    } else {

      var authorInfo = data
      var artistOtherVideos = data.artistOtherVideos
      var relatedVideos = data.relatedVideos
      var relatedPlayList = data.relatedPlayList

      return (
        <View style={styles.view}>
          <View style={styles.statusBar}></View>
          <VideoPage url={authorInfo.url} title={authorInfo.title}/>
          <Image style={styles.backgroundColor} source={require('../../img/background.png')} resizeMode='stretch' >
            <ScrollView styles={styles.scrollView}>
              <AuthorInfo data={authorInfo}/>
              <Line />
              <MostWatch videoId={videoId}/>
              <Line />
              <AuthorListMV data={artistOtherVideos}/>
              <Line />
              <RelatedPlayList data={relatedPlayList}/>
              <Line />
              <GuestLike data={relatedVideos}/>
            </ScrollView>
          </Image>
        </View>
      )
    }
  }

}

const styles = StyleSheet.create({
  view: {
    width: width,
    height: height
  },
  statusBar: {
    width: width,
    height: 20,
    backgroundColor: 'black'
  },
  video: {
    width: width,
    height: width / 16 * 9,
    backgroundColor: 'black'
  },
  scrollView: {
    width:width,
    height: height - (width / 16 * 9) - 20,
  },
  backgroundColor:{
    width:width,
    height: height - (width / 16 * 9) - 20
  },
  loadingView: {
    width: width,
    height: height,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: purpure
  },
  loading:{
    width: 100,
    height: 100
  }
})

export default connect(state => ({
  data: state.PlayerReducer.authorInfo
  }),
  (dispatch) => ({
    actions: bindActionCreators(PlayerAction, dispatch)
  })
)(PlayerMV)
