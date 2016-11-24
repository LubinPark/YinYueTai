import React,{Component} from 'react'
import _ from 'underscore'
import Video from 'react-native-video'

import {
  View,
  Text,
  Image,
  Slider,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

var Device = require('../../utils/device')
var {width,height,alpha0} = Device

export default class VideoPage extends Component {

  static contextTypes = {
    app: React.PropTypes.object
  }

  render () {

    var url = this.props.url
    var title = this.props.title

    return (
      <View style={styles.video}>
        {/* 播放器*/}
        <Video source={{uri:url}}             // Can be a URL or a local file.
               rate={1.0}                     // 0 is paused, 1 is normal.
               volume={1.0}                   // 0 is muted, 1 is normal.
               muted={false}                  // Mutes the audio entirely.
               paused={false}                 // Pauses playback entirely.
               resizeMode="cover"             // Fill the whole screen at aspect ratio.
               repeat={true}                  // Repeat forever.
               playInBackground={false}       // Audio continues to play when app entering background.
               playWhenInactive={false}       // [iOS] Video continues to play when control or notification center are shown.
               progressUpdateInterval={250.0} // [iOS] Interval to fire onProgress (default to ~250ms)
               onLoadStart={this.loadStart}   // Callback when video starts to load
               onLoad={this.setDuration}      // Callback when video loads
               onProgress={this.setTime}      // Callback every ~250ms with currentTime
               onEnd={this.onEnd}             // Callback when playback finishes
               onError={this.videoError}      // Callback when video cannot be loaded
               style={styles.video} />
        {/* 播放器上部的按钮*/}
        <View style={styles.buttonUpView}>
          <TouchableOpacity onPress={()=>this._backToHome()}>
            <Image style={styles.back} source={require('../../img/back.png')} />
          </TouchableOpacity>
          <View style={styles.titleView}>
            <Text style={styles.title} numberOfLines={1}>{title}</Text>
          </View>
        </View>
        {/* 播放器底部的按钮*/}
        <View style={styles.buttonBottomView}>
          <View style={styles.bottomLeftView}>
            <Image style={styles.playbutton} source={require('../../img/play_pause.png')} />
            <Slider style={styles.slider} thumbImage = {require('../../img/slider.png')} />
            <View style={styles.timeView}>
              <Text style={styles.time}>00:00 / 00:00</Text>
            </View>
          </View>
          <View style={styles.bottomRigtView}>
            <Image style={styles.playbutton} source={require('../../img/full_screen.png')} />
          </View>
        </View>
      </View>
    )
  }

  _backToHome() {
    this.context.app.navigator.popToTop()
  }

}

const styles = StyleSheet.create({
  video: {
    width: width,
    height: width / 16 * 9,
    backgroundColor: 'black'
  },
  buttonUpView: {
    width: width,
    height: 40,
    flexDirection: 'row',
    marginTop: -(width / 16 * 9)
  },
  back: {
    width: 25,
    height: 25,
    marginTop: 7,
    alignItems:'center'
  },
  titleView: {
    alignItems:'center',
    justifyContent:'center',
    width : width / 3 * 2,
    marginLeft: 30,
    backgroundColor: alpha0
  },
  title: {
    color: '#ffffff',
    fontSize: 17
  },
  buttonBottomView: {
    width: width,
    height: 40,
    marginTop: (width / 16 * 9) - 80,
    alignItems: 'center',
    flexDirection: 'row',
  },
  bottomLeftView: {
    width: width - 40,
    flexDirection:'row'
  },
  bottomRigtView: {
    width: 40,
  },
  playbutton: {
    width: 25,
    height: 25,
    marginTop: 5,
    marginLeft: 5,
    marginRight: 10
  },
  slider: {
    width: width / 2,
    height: 30,
    marginTop: 3,
    marginRight: 10
  },
  timeView: {
    marginRight: 10,
    justifyContent:'center',
    backgroundColor:alpha0
  },
  time: {
    color: '#ffffff',
    fontSize: 12
  }
})
