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
  StatusBar,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

var Device = require('../../utils/device')
var ds = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 })
const { width, height, lightGray, gray, fadeGray } = Device

class ChatPage extends Component {

  static contextTypes = {
    app: React.PropTypes.object
  }

  constructor(props) {
    super(props)
    this.state = {
      data: [
        {name:'Park',lastMessage:'你好'},
        {name:'Park2',lastMessage:'Hello'},
        {name:'Park3',lastMessage:'你好1'},
        {name:'Park4',lastMessage:'你好2'}
      ]
    }
  }

  componentWillMount() {
    // this.props.actions.fetchChatActionIfNeeded({type:'send'})
  }

  componentDidMount() {
    // this.props.actions.fetchChatActionIfNeeded({type:'received'})
  }

  render() {
    let titleConfig = { title: '消息', tintColor: '#fff' }
    return (
      <View style={styles.loadingView}>
        <NavigationBar
          title ={titleConfig}
          tintColor={'black'}
          statusBar={{style: 'light-content'}}/>
        <View style={styles.ListView}>
          {this._chatList()}
        </View>
      </View>
    )
  }

  _chatList() {
    return (
      <ListView
        style={styles.listView}
        initialListSize={10}
        dataSource={ds.cloneWithRows(this.state.data)}
        renderRow={(rowData)=>this._renderRow(rowData)}
      />
    )
  }

  _renderRow(rowData) {
    return (
      <TouchableOpacity style={[styles.rowDataView, styles.border]} onPress={() => {this._toMessage(rowData)}}>
        <ChatItem data={rowData} />
      </TouchableOpacity>
    )
  }

  _toMessage(rowData) {
    this.context.app.navigator.push({
      id:'MessagePageNew',
      data: {
        user: rowData
      }
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
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  border: {
    borderBottomColor: gray,
    borderBottomWidth: StyleSheet.hairlineWidth
  }
})

export default connect(state => ({
  data: state.ChatReducer
  }),
  (dispatch) => ({
    actions: bindActionCreators(ChatAction, dispatch)
  })
)(ChatPage)
