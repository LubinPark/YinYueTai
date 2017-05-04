import _ from 'underscore'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import NavigationBar from 'react-native-navbar'

import ChatItem from './chatItem'
import * as ChatAction from '../../actions/chatAction'

import {
  View,
  Text,
  ListView,
  StyleSheet,
  TouchableOpacity,
  InteractionManager
} from 'react-native'

var Device = require('../../utils/device')
var ds = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 })
const { width, height, fadeGray } = Device

class ChatPage extends Component {

  static contextTypes = {
    app: React.PropTypes.object
  }

  componentWillMount() {
    InteractionManager.runAfterInteractions(() => {
      this.props.actions.fetchChatActionIfNeeded({
        type:'received',
        limit: 10,
        skip: 0
      })
    })
  }

  render() {

    let chatList = this.props.data.chatList
    let titleConfig = { title: '消息', tintColor: '#fff' }

    return (
      <View style={styles.loadingView}>
        <NavigationBar
          title ={titleConfig}
          tintColor={'black'}
          statusBar={{style: 'light-content'}}/>
        <View style={styles.ListView}>
          {this._chatList(chatList)}
        </View>
      </View>
    )
  }

  _chatList(chatList) {
    if (!_.isEmpty(chatList)) {
      return (
        <ListView
          style={styles.listView}
          initialListSize={10}
          enableEmptySections={true}
          dataSource={ds.cloneWithRows(chatList)}
          renderRow={(rowData)=>this._renderRow(rowData)}
        />
      )
    }
  }

  _renderRow(rowData) {
    return (
      <TouchableOpacity style={styles.rowDataView} onPress={() => {this._toMessage(rowData)}}>
        <ChatItem data={rowData.user} lastMessage={rowData.lastMessage}/>
      </TouchableOpacity>
    )
  }

  _toMessage(rowData) {
    this.props.actions.fetchChatActionIfNeeded({
      data: rowData,
      type: 'pushMessagePage',
      navigator: this.context.app.navigator
    })
  }
}

const styles = StyleSheet.create({
  loadingView: {
    width: width,
    height: height,
    backgroundColor: fadeGray
  },
  title: {
    color: '#fff'
  },
  listView: {
    width: width,
    height: height - 64 - 49
  },
  rowDataView: {
    width: width,
    height: 60,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  }
})

export default connect(state => ({
  data: state.ChatReducer,
  user: state.UserReducer
  }),
  (dispatch) => ({
    actions: bindActionCreators(ChatAction, dispatch)
  })
)(ChatPage)
