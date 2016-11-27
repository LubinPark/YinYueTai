import React,{Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
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
import Line from '../commonfile/line'
import VideoPage from './videoPage'
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
    //请求新数据
    InteractionManager.runAfterInteractions(() => {
      this.props.actions.fetchPlayerIfNeeded({type: 'authorInfo', videoId:this.props.videoId})
    })
  }

  render () {

    var videoId = this.props.videoId
    var data = this.props.data
    var num = _.random(0, 2)

    if (_.isEmpty(this.props.data)) {
      return(
        <Loading num={num}/>
      )
    } else {

      var authorInfo = data
      var artistOtherVideos = data.artistOtherVideos
      var relatedVideos = data.relatedVideos
      var relatedPlayList = data.relatedPlayList
      var num = _.random(0, 2)

      return (
        <View style={styles.view}>
          <StatusBar hidden={true} />
          <VideoPage url={authorInfo.url} title={authorInfo.title}/>
          <Image style={styles.backgroundColor} source={require('../../img/background/background_0.png')} resizeMode='stretch' >
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
    height: height - (width / 16 * 9)
  },
  backgroundColor:{
    width:width,
    height: height - (width / 16 * 9)
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
