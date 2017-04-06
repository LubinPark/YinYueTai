import React, { Component } from 'react'
import _ from 'underscore'
import {
  View,
  Button,
  TextInput,
  StyleSheet
} from 'react-native'

var Device = require('../../utils/device')
var { itemHeight, width, height } = Device

export default class Anthor extends Component {

  constructor(props) {
    super(props)
    this.state = {
      account : '',
      password : ''
    }
  }

  render () {
    return (
      <View style={[styles.container,styles.center]}>
        <TextInput style={styles.TextInputSty}
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
          <Button style={styles.submit} title='登录' onPress={() => this._submit()} />
          <Button style={styles.submit} title='注册' onPress={() => this._register()} />
        </View>
      </View>
    )
  }

  _account(value) {
    var account = value.nativeEvent.text
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

  _submit() {
    let account = this.state.account
    let password = this.state.password

  }

  _register() {
    console.log(`register`);
  }

}

const styles = StyleSheet.create({
  container: {
    width:width,
    height: height,
    backgroundColor: '#fff'
  },
  TextInputSty: {
    width: width - 40,
    height: 50,
    paddingLeft: 15,
    marginLeft: 20,
    marginBottom: 50,
    height: 50,
    color: '#666',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#ccc',
    backgroundColor:'#fff'
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  submit: {
    width: width / 3,
    height: 60
  }
})
