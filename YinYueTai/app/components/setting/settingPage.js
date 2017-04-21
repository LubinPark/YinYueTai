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
    this.state = {
      account : '',
      password : ''
    }
  }

  render () {

    let titleConfig = { title: '我的' }

    return (
      <View style={styles.container}>
        <NavigationBar title ={titleConfig} />
        <View style={styles.logOutView}>
          <TouchableOpacity onPress={() => this._logOut()}>
            <Text>退出</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  _logOut() {
    this.props.actions.UserAction({type: 'logOut'})
  }

}

const styles = StyleSheet.create({
  container: {
    width:width,
    height: height,
    backgroundColor: '#fff'
  },
  logOutView: {
    width: width  - 100,
    height: 40,
    marginLeft: 50,
    borderRadius: 5,
    borderColor: gray,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: StyleSheet.hairlineWidth
  }
})

export default connect(state => ({
  data: state
  }),
  (dispatch) => ({
    actions: bindActionCreators(UserAction, dispatch)
  })
)(SettingPage)
