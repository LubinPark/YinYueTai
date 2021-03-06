import _ from 'underscore'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import NavigationBar from 'react-native-navbar'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

import * as UserAction from '../../actions/userAction'

const Device = require('../../utils/device')
const { width, height, lightGray, isAndroid } = Device

class LoginPage extends Component {

  static contextTypes = {
    app: React.PropTypes.object
  }

  constructor(props) {
    super(props)
    this.state = {
      account : '',
      password : ''
    }
  }

  render () {

    let titleConfig = { title: '登录' }

    return (
      <View style={styles.container}>
        <NavigationBar title ={titleConfig} />
        <KeyboardAwareScrollView>
          <TextInput style={[styles.TextInputSty,{marginTop: height / 3}]}
                     ref='account'
                     placeholder='账号'
                     numberOfLines={1}
                     underlineColorAndroid="transparent"
                     onChange={(value) => this._account(value)}/>
          <TextInput style={styles.TextInputSty}
                     ref='password'
                     placeholder='密码'
                     secureTextEntry={true}
                     numberOfLines={1}
                     underlineColorAndroid="transparent"
                     onChange={(value) => this._password(value)}/>
        </KeyboardAwareScrollView>
        <View style={[styles.center, {height: isAndroid ? 90 : 70}]}>
          <TouchableOpacity style={styles.button}
                            onPress={() => this._submit()}>
            <Text style={[styles.text,styles.login]}
                  allowFontScaling={false}
                  numberOfLines={1}>登录</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}
                            onPress={() => this._register()}>
            <Text style={[styles.text, styles.register]}
                  allowFontScaling={false} numberOfLines={1}>注册</Text>
          </TouchableOpacity>
        </View>
        { !!(this.props.data.loginState !== 'NONE' || this.props.data.loginState !== 'LOGOUT')
          ? <View style={styles.errorView}>
            <Text style={styles.info}
                  allowFontScaling={false}
                  numberOfLines={1}>{this.props.data.loginState}
            </Text>
          </View>
          : null
        }
      </View>
    )
  }

  _account(value) {
    let account = value.nativeEvent.text
    this.setState({
      account: account
    })
  }

  _password(value) {
    let password = value.nativeEvent.text
    this.setState({
      password: password
    })
  }

  _submit() {
    this.props.actions.fetchUserAction({
      type: 'login',
      name: this.state.name,
      account: this.state.account,
      password: this.state.password,
      navigator: this.context.app.navigator
    })
  }

  _register() {
    this.context.app.navigator.push({
      id:'RegisterPage'
    })
  }

}

const styles = StyleSheet.create({
  container: {
    width:width,
    height: height,
    backgroundColor: '#fff'
  },
  TextInputSty: {
    width: width - 100,
    paddingLeft: 15,
    marginLeft: 50,
    marginTop: 30,
    height: 40,
    fontSize: 13,
    color: lightGray,
    borderRadius: 5,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc',
    backgroundColor:'#fff'
  },
  center: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  login: {
    color: lightGray
  },
  register: {
    color: lightGray
  },
  button: {
    borderRadius: 5
  },
  text: {
    fontSize: 14,
    padding: 5,
    textAlign: 'center'
  },
  errorView: {
    position: 'absolute',
    bottom: 100,
    width: width,
    height: 50,
    alignItems:'center',
    justifyContent:'center'
  },
  info: {
    height: 50,
    textAlign: 'center'
  }
})

export default connect(
  state => ({
    data: state.UserReducer
  }),
  (dispatch) => ({
    actions: bindActionCreators(UserAction, dispatch)
  })
)(LoginPage)
