import React,{Component} from 'react'
import _ from 'underscore'
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native'

var Device = require('../../utils/device')
var {width,height,gray,lightGray,alpha0} = Device

export default class AuthorInfo extends Component {

  static contextTypes = {
    app: React.PropTypes.object
  }

  constructor(props) {
    super(props)
    this.state = {
      numberOfLines: 2
    }
  }

  render () {

    var data = this.props.data

    if (_.isEmpty(data)) {
      return (
        <View>
        </View>
      )
    } else {

      var creator = data.creator
      var artistAvatar = data.artists[0].artistAvatar

      return (
        <View style={styles.view}>
          {/* 顶部照片和名字*/}
          <View style={[styles.center,styles.marginBottom]}>
            <Image style={styles.authorImg} source={{uri: artistAvatar}} />
            <Text style={styles.authorNmme}>{data.artistName}</Text>
          </View>
          {/* 播放次数和5张图片*/}
          <View style={[styles.center,styles.marginBottom]}>
            <View style={styles.numView}>
              <Text style={[styles.center,styles.number]}>播放次数:{data.totalView}</Text>
            </View>
            <Image style={styles.button} source={require('../../img/message.png')} />
            <Image style={styles.button} source={require('../../img/collection.png')} />
            <Image style={styles.button} source={require('../../img/add.png')} />
            <Image style={styles.button} source={require('../../img/download.png')} />
            <Image style={styles.button} source={require('../../img/share.png')} />
          </View>
          {/* 描述*/}
          <View style={styles.descTextView}>
            <Text style={styles.desc} numberOfLines={this.state.numberOfLines}>{data.desc}</Text>
          </View>
          {/* 点击按钮*/}
          <TouchableOpacity onPress={() => this._showMoreDesc()}>
            <View style={styles.descMoreInfoView}>
            {this._showMoreBtn()}
            </View>
          </TouchableOpacity>
          {/* 最下面的一行上传的信息*/}
          <View style={styles.center}>
            <View style={styles.bottomLeft}>
              <Image style={styles.loading} source={{uri: creator.smallAvatar}} />
              <Text style={styles.loading_and_time}>上传者:</Text>
              <Text style={styles.vipName}>{creator.nickName}</Text>
              <Image style={styles.level} source={{uri: creator.vipImg}} />
            </View>
            <View style={styles.bottomRight}>
              <Image style={styles.timeImg} source={require('../../img/time.png')} />
              <Text style={styles.loading_and_time}>{data.regdate}</Text>
            </View>
          </View>
        </View>
      )
    }
  }

  _showMoreDesc() {
    if (this.state.numberOfLines == 2) {
      this.setState({
        numberOfLines: 0
      })
    } else {
      this.setState({
        numberOfLines: 2
      })
    }
  }

  _showMoreBtn() {
    if (this.state.numberOfLines == 2) {
      return (
        <Image style={styles.moreInfoBtn} source={require('../../img/moreInfo_left.png')} />
      )
    } else {
      return (
        <Image style={styles.moreInfoBtn} source={require('../../img/moreInfo_down.png')} />
      )
    }
  }

}

const styles = StyleSheet.create({
  view: {
    width: width,
    backgroundColor: alpha0
  },
  center: {
    flexDirection:'row',
    alignItems:'center'
  },
  authorImg: {
    width: 66,
    height: 66,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 33,
  },
  authorNmme: {
    fontSize: 15,
    marginTop: 10,
    color: '#ffffff',
  },
  numView: {
    width: width / 7 * 2,
    alignItems:'center'
  },
  number: {
    fontSize: 13,
    color: '#ffffff'
  },
  button: {
    marginLeft: 10,
    marginRight: 10,
    width:width / 12,
    height: width / 12
  },
  marginBottom: {
    marginBottom: 10
  },
  descTextView: {
    width: width,
  },
  desc: {
    fontSize: 14,
    marginLeft:10,
    color: '#ffffff',
  },
  descMoreInfoView: {
    flex: 1,
    alignItems:'flex-end',
  },
  moreInfoBtn: {
    width: 15,
    height: 15,
    marginTop: 10,
    marginRight: 10
  },
  loading: {
    width: 25,
    height: 25,
    marginLeft: 10,
    marginRight: 5,
    marginBottom: 8,
    borderRadius: 25 / 2
  },
  vipName: {
    marginLeft: 5,
    color: 'red',
    fontSize:12
  },
  level: {
    width: 19,
    height: 15,
    marginLeft: 5
  },
  bottomLeft: {
    alignItems:'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  bottomRight: {
    flex: 1,
    marginTop: 3,
    marginRight: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  timeImg: {
    width: 18,
    height: 18,
    marginTop: -3,
    marginRight: 5,
    borderRadius: 18 / 2
  },
  loading_and_time: {
    color: gray,
    fontSize: 12
  }
})
