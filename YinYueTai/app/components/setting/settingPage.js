import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import NavigationBar from 'react-native-navbar'
import _ from 'underscore'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

import * as UserAction from '../../actions/userAction'

var Device = require('../../utils/device')
const { width, height, gray } = Device

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

    let titleConfig = { title: '我的' }
    let { loginState, userInfo }  = this.props.data
    return (
      <View style={styles.container}>
        <NavigationBar title ={titleConfig} />
        {this._userInfoView(userInfo)}
      </View>
    )
  }

  _userInfoView(userInfo) {
    if (!_.isEmpty(userInfo)) {
      let { username, email } = userInfo.attributes
      return (
        <View style={styles.userInfoView}>
          <Text>{username}</Text>
          <Text>{email}</Text>
            <View style={styles.logOutView}>
              <TouchableOpacity onPress={() => this._logOut()}>
                <Text>退出</Text>
              </TouchableOpacity>
            </View>
        </View>
      )
    } else {
      return (
        <View style={styles.userInfoView}>
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
  logOutView: {
    position: 'absolute',
    left: 50,
    bottom: 70,
    width: width  - 100,
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
    alignItems: 'center',
    backgroundColor:'#fff'
  }
})

export default connect(state => ({
  data: state.UserReducer
  }),
  (dispatch) => ({
    actions: bindActionCreators(UserAction, dispatch)
  })
)(SettingPage)
