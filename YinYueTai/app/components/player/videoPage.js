import _ from 'underscore'
import React, { Component } from 'react'
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
const { width, height, alpha0, green } = Device

export default class VideoPage extends Component {

  static contextTypes = {
    app: React.PropTypes.object
  }

  constructor(props) {
    super(props)
    this.state = {
      url: this.props.url,
      paused: false,
      currentTime: '--:--',    //当前时间
      durationTime: '--:--',   //总时长
      current: 0,              //进度条的值
      duration: 0,             //进度条的最大值
    }
  }

  render () {

    let url = this.state.url
    let title = this.props.title
    let full_screen = {
      width: width,
      height: width / 16 * 9,
      backgroundColor: 'black'
    }

    return (
      <View>
        {/* 播放器*/}
        <Video source={{uri: url}}                             // Can be a URL or a local file.
               rate={1.0}                                      // 0 is paused, 1 is normal.
               volume={1.0}                                    // 0 is muted, 1 is normal.
               muted={false}                                   // Mutes the audio entirely.
               paused={this.state.paused}                      // Pauses playback entirely.
               resizeMode="contain"                            // Fill the whole screen at aspect ratio.
               repeat={true}                                   // Repeat forever.
               playInBackground={false}                        // Audio continues to play when app entering background.
               playWhenInactive={false}                        // [iOS] Video continues to play when control or notification center are shown.
               progressUpdateInterval={250.0}                  // [iOS] Interval to fire onProgress (default to ~250ms)
               onLoadStart={this.loadStart}                    // Callback when video starts to load
               onLoad={(value)=>this._showDuration(value)}     // Callback when video loads
               onProgress={(value)=>this._showCurrent(value)}  // Callback every ~250ms with currentTime
               onEnd={this.onEnd}                              // Callback when playback finishes
               onError={this.videoError}                       // Callback when video cannot be loaded
               style={full_screen} />
        {/* 播放器上部的按钮*/}
        <View style={styles.buttonUpView}>
          <TouchableOpacity style={{justifyContent:'center'}} onPress={()=>this._backToHome()}>
            <Image style={styles.back} source={require('../../img/back.png')} />
          </TouchableOpacity>
          <View style={styles.titleView}>
            <Text style={styles.title} allowFontScaling={false} numberOfLines={1}>{title}</Text>
          </View>
        </View>
        {/* 播放器底部的按钮*/}
        <View style={styles.buttonBottomView}>
          <View style={styles.bottomLeftView}>
            {this._showPlayBtn(this.state.paused)}
            <Slider style={styles.slider}
                    minimumTrackTintColor={green}
                    thumbImage={require('../../img/slider.png')}
                    value={this.state.current}
                    onValueChange={(value)=>this._showCurrent(value)}
                    maximumValue={this.state.duration}
             />
            <View style={styles.timeView}>
              <Text style={styles.time} allowFontScaling={false} numberOfLines={1}>{this.state.currentTime} / {this.state.durationTime}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={()=>this._orientationDidChange()}>
            <View style={styles.bottomRigtView}>
              <Image style={styles.playbutton} source={require('../../img/full_screen.png')} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )

  }

  _backToHome() {
    this.context.app.navigator.popToTop()
    this.props.cleanPLayData()
  }

  _showPlayBtn(status) {
    if (status == false) {
      return (
        <TouchableOpacity onPress={()=>this._playerButton(this.state.paused)} >
          <Image style={styles.playbutton} source={require('../../img/play_pause.png')} />
        </TouchableOpacity>
      )
    } else {
      return (
        <TouchableOpacity onPress={()=>this._playerButton(this.state.paused)} >
          <Image style={styles.playbutton} source={require('../../img/play_play.png')} />
        </TouchableOpacity>
      )
    }
  }

  _playerButton(status) {
    this.setState({
      paused: !status
    })
  }

  _orientationDidChange() {
    
  }

  _showDuration(time) {
    //总时长时间
    let duration = parseInt(time.duration)
    let durationMin = parseInt(duration / 60)
    let durationSecond = duration - durationMin * 60

    if (durationSecond <= 9) {
      durationSecond = '0' + durationMin
    }

    let durationTime = durationMin+':'+durationSecond

    this.setState({
      durationTime: durationTime,
      duration: duration
    })
  }

  _showCurrent(time) {
    //当前时间
    let current = parseInt(time.currentTime)
    let currentTimeMin = parseInt(current / 60)
    let currentTimeSecond = current - currentTimeMin * 60

    if (currentTimeSecond <= 9) {
      currentTimeSecond = '0' + currentTimeSecond
    }

    let currentTime = currentTimeMin+':'+currentTimeSecond

    this.setState({
      currentTime: currentTime,
      current: current
    })
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
    height: 64,
    flexDirection: 'row',
    marginTop: -(width / 16 * 9)
  },
  back: {
    width: 30,
    height: 30,
    marginLeft: 5
  },
  titleView: {
    alignItems:'center',
    justifyContent:'center',
    width : width / 4 * 3,
    marginLeft: 10,
    backgroundColor: alpha0
  },
  title: {
    color: '#ffffff',
    fontSize: 17
  },
  buttonBottomView: {
    width: width,
    height: 40,
    marginTop: (width / 16 * 9) - 104,
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
    marginTop: 8,
    marginLeft: 5,
    marginRight: 10
  },
  slider: {
    width: width / 2,
    height: 30,
    marginTop: 5,
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
