import React,{Component} from 'react'
import _ from 'underscore'
import Video from 'react-native-video'

import {
  View,
  Image,
  StyleSheet,
} from 'react-native'

var Device = require('../../utils/device')
var {width,height} = Device

export default class VideoPage extends Component {

  static contextTypes = {
    app: React.PropTypes.object
  }

  componentDidMount() {

  }

  render () {

    var url = this.props.url

    return (
      <View style={styles.video}>
      <Video source={{uri:url}}   // Can be a URL or a local file.
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
             style={styles.video}
      />
      </View>
    )
  }



}

const styles = StyleSheet.create({
  video: {
    width: width,
    height: width / 16 * 9,
    backgroundColor: 'black'
  }
})
