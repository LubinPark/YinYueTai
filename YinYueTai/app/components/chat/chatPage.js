import _ from 'underscore'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import NavigationBar from 'react-native-navbar'

import * as ChatAction from '../../actions/chatAction'
import CommonStatusBar from '../commonfile/commonStatusBar'

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

  componentWillMount() {
    // this.props.actions.fetchChatActionIfNeeded({type:'send'})
  }

  componentDidMount() {
    this.props.actions.fetchChatActionIfNeeded({type:'received'})
  }

  render() {
    let titleConfig = <Text style={styles.title}>消息</Text>
    return (
      <View style={styles.loadingView}>
        <CommonStatusBar />
        <NavigationBar title ={titleConfig} tintColor={'black'} />
        <View style={styles.ListView}>
          {this._chatList()}
        </View>
      </View>
    )
  }

  _chatList() {
    var dataSource = [1,2,3,4,5,6,7,8,9,10]
    return (
      <ListView
        style={styles.listView}
        initialListSize={10}
        dataSource={ds.cloneWithRows(dataSource)}
        renderRow={(rowData)=>this._renderRow(rowData)}
      />
    )
  }

  _renderRow(rowData) {
    return (
      <TouchableOpacity style={[styles.rowDataView, styles.border]} onPress={() => {this._toMessage()}}>
        <Text style={styles.text}>Message{rowData}</Text>
      </TouchableOpacity>
    )
  }

  _toMessage() {
    this.context.app.navigator.push({
      id:'MessagePage'
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
  },
  text: {
    color: lightGray,
    fontSize: 12
  }
})

export default connect(state => ({
  data: state.ChatReducer
  }),
  (dispatch) => ({
    actions: bindActionCreators(ChatAction, dispatch)
  })
)(ChatPage)
