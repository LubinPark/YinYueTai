import _ from 'underscore'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import NavigationBar from 'react-native-navbar'

import * as ChatAction from '../../actions/chatAction'

import {
  View,
  StatusBar,
  StyleSheet
} from 'react-native'

var Device = require('../../utils/device')
const { width, height } = Device

class ChatPage extends Component {

  componentWillMount() {
    this.props.actions.fetchChatActionIfNeeded({type:'send'})
  }

  componentDidMount() {
    this.props.actions.fetchChatActionIfNeeded({type:'received'})
  }

  render() {

    let titleConfig = { title: '消息' }

    return (
      <View style={styles.loadingView}>
        <StatusBar barStyle="default"/>
        <NavigationBar title ={titleConfig} />
      </View>
    )
  }

}

const styles = StyleSheet.create({
  loadingView: {
    width: width,
    height: height,
    backgroundColor: '#fff'
  }
})

export default connect(state => ({
  data: state.ChatReducer
  }),
  (dispatch) => ({
    actions: bindActionCreators(ChatAction, dispatch)
  })
)(ChatPage)
