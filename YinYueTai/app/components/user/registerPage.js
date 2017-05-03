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
  TouchableOpacity,
  InteractionManager
} from 'react-native'

import * as UserAction from '../../actions/userAction'

var Device = require('../../utils/device')
const { width, height, lightGray } = Device

class RegisterPage extends Component {

  static contextTypes = {
    app: React.PropTypes.object
  }

  constructor(props) {
    super(props)
    this.state = {
      name: '',
      account : '',
      password : ''
    }
  }

  render () {

    let titleConfig = { title: '注册' }

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
                     placeholder='姓名'
                     numberOfLines={1}
                     underlineColorAndroid="transparent"
                     onChange={(value) => this._userName(value)}/>
          <TextInput style={styles.TextInputSty}
                     ref='password'
                     placeholder='密码'
                     secureTextEntry={true}
                     numberOfLines={1}
                     underlineColorAndroid="transparent"
                     onChange={(value) => this._password(value)}/>
        </KeyboardAwareScrollView>
        <TouchableOpacity style={styles.button} onPress={() => this._register()}>
          <Text style={[styles.text,styles.login]}>确定</Text>
        </TouchableOpacity>
        { (this.props.data.registerState === 'FAILED') ?
          <View style={styles.errorView}>
            <Text style={styles.info}>{this.props.data.registerErrorInfo}</Text>
          </View>
          : <Text/>
        }
      </View>
    )
  }

  _userName(value) {
    let name = value.nativeEvent.text
    this.setState({
      name: name
    })
  }

  _account(value) {
    let account = value.nativeEvent.text
    this.setState({
      account: account
    })
  }

  _password(value) {
    var password = value.nativeEvent.text
    this.setState({
      password: password
    })
  }

  _register() {
    this.props.actions.fetchUserAction({
      type: 'register',
      name: this.state.name,
      account: this.state.account,
      password: this.state.password,
      navigator: this.context.app.navigator
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
    borderRadius: 5,
    marginBottom: 60
  },
  text: {
    fontSize: 14,
    padding: 5,
    textAlign: 'center'
  }
})

export default connect(state => ({
  data: state.UserReducer
  }),
  (dispatch) => ({
    actions: bindActionCreators(UserAction, dispatch)
  })
)(RegisterPage)
