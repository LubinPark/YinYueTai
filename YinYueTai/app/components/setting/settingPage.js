import _ from 'underscore'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import NavigationBar from 'react-native-navbar'

import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

import * as UserAction from '../../actions/userAction'

var Device = require('../../utils/device')
const { width, height, gray, isAndroid } = Device

class SettingPage extends Component {

  static contextTypes = {
    app: React.PropTypes.object
  }

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.actions.fetchUserAction({type:'currentUser'})
  }

  render () {

    let titleConfig = { title: '我的', tintColor: '#fff' }
    let { loginState, userInfo }  = this.props.data

    return (
      <View style={styles.container}>
        <NavigationBar
          title ={titleConfig}
          tintColor={'black'}
          statusBar={{style: 'light-content'}}
        />
        {this._userInfoView(userInfo)}
      </View>
    )
  }

  _userInfoView(userInfo) {
    if (!_.isEmpty(userInfo)) {

      let { username, email } = userInfo.attributes
      let img = !!userInfo.get('userPic') ? userInfo.get('userPic') : require('../../img/userhead.png')

      return (
        <View style={[styles.userInfoView,styles.center]}>
          <Image source={img} style={styles.userPic}/>
          <View style={styles.rightView}>
            <Text style={styles.nameText} allowFontScaling={false} numberOfLines={1}>
              {username}
            </Text>
            <Text allowFontScaling={false} numberOfLines={1}>
              {email}
            </Text>
          </View>
          <TouchableOpacity style={styles.logOutView} onPress={() => this._logOut()}>
            <View><Text allowFontScaling={false} numberOfLines={1}>退出</Text></View>
          </TouchableOpacity>
        </View>
      )
    } else {
      return (
        <View style={[styles.userInfoView,styles.center,{justifyContent:'center'}]}>
          <TouchableOpacity onPress={() => this._login()}>
            <Text>登录</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }

  _logOut() {
    this.props.actions.fetchUserAction({
      type: 'logOut',
      app: this.context.app.navigator
    })
  }

  _login() {
    this.props.actions.fetchUserAction({
      type: 'pushLoginPage',
      app: this.context.app.navigator
    })
  }

}

const styles = StyleSheet.create({
  container: {
    width:width,
    height: height,
    backgroundColor: '#fff'
  },
  center: {
    flexDirection: 'row',
  },
  logOutView: {
    position: 'absolute',
    left: 20,
    bottom: isAndroid ? 90 : 70,
    width: width  - 40,
    height: 40,
    borderRadius: 5,
    borderColor: gray,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: StyleSheet.hairlineWidth
  },
  userInfoView: {
    flex: 1,
    width: width,
    marginTop: 20,
    backgroundColor:'#fff'
  },
  userPic: {
    width: 75,
    height: 75,
    marginLeft: 20,
    borderRadius: 5,
    backgroundColor: '#fff'
  },
  rightView: {
    flex: 1,
    height: 75,
    marginLeft: 20,
    marginRight: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  nameText: {
    marginBottom: 10
  }
})

export default connect(state => ({
  data: state.UserReducer
  }),
  (dispatch) => ({
    actions: bindActionCreators(UserAction, dispatch)
  })
)(SettingPage)
