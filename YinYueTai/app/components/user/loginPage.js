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
const { width, height, lightGray } = Device

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
        <TextInput style={[styles.TextInputSty,{marginTop: height / 2}]}
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
        <View style={styles.center}>
          <TouchableOpacity style={styles.button} onPress={() => this._submit()}>
            <Text style={[styles.text,styles.login]}>登录</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => this._register()}>
            <Text style={[styles.text,styles.register]}>注册</Text>
          </TouchableOpacity>
        </View>
        { (this.props.data.loginState === 'FAILED') ?
          <View style={styles.errorView}>
            <Text style={styles.info}>{this.props.data.loginErrorInfo}</Text>
          </View>
          : <Text/>
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
    marginBottom: 30,
    height: 40,
    fontSize: 13,
    color: lightGray,
    borderRadius: 5,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc',
    backgroundColor:'#fff'
  },
  center: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row'
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
    bottom: 30,
    width: width,
    height: 50,
    justifyContent:'center',
    alignItems:'center'
  },
  info: {
    height: 50,
    textAlign: 'center'
  }
})

export default connect(state => ({
  data: state.UserReducer
  }),
  (dispatch) => ({
    actions: bindActionCreators(UserAction, dispatch)
  })
)(LoginPage)
