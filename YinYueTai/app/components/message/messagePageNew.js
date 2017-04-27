import _ from 'underscore'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import NavigationBar from 'react-native-navbar'
import InvertibleScrollView from 'react-native-invertible-scroll-view'

import * as MessageAction from '../../actions/messageAction'

import Loading from '../commonfile/loading'
import MessageInput from './messageInput'
import MessageItem from './messageItem'

var ds = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 })

import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  ListView,
  StyleSheet,
  TouchableWithoutFeedback
} from 'react-native'

var Device = require('../../utils/device')
const { width, height, fadeGray, backView, gray, lightGray, border } = Device

class MessagePageNew extends Component {

  static contextTypes = {
    app: React.PropTypes.object
  }

  constructor(props) {
    super(props)
  }

  componentDidMount() {

  }

  render() {

    let message = this.props.data.message
    let user = this.props.user
    let titleConfig = { title: user.name, tintColor: '#fff' }
    let leftButtonConfig = <TouchableWithoutFeedback onPress={()=>this._back()}>
                            <Image source={require('../../img/back.png')} style={backView}/>
                           </TouchableWithoutFeedback>


    return (
      <View style={styles.container}>
        <NavigationBar
          title={titleConfig}
          tintColor={'black'}
          leftButton={leftButtonConfig}
          statusBar={{style: 'light-content'}}
        />
        <Image style={styles.backgroundImg} source={require('../../img/background/background_2.png')}>
        {this._messageList(message)}
        {this._InputView()}
        </Image>
      </View>
    )
  }

  _messageList(message) {
    return (
      <ListView
        style={styles.messageListView}
        renderScrollComponent={props => <InvertibleScrollView {...props} inverted />}
        dataSource={ds.cloneWithRows(message)}
        renderRow={(rowData)=>this._renderRow(rowData)}
      />
    )
  }

  _renderRow(rowData) {
    return (
      <MessageItem data={rowData}/>
    )
  }

  _InputView() {
    return (
      <MessageInput  {...this.props} />
    )
  }

  _back() {
    this.context.app.navigator.pop()
  }

}

const styles = StyleSheet.create({
  container: {
    width: width,
    height:height,
    backgroundColor:'#fff'
  },
  backgroundImg: {
    width: width,
    height: height - 64,
    backgroundColor:'transparent'
  },
  messageListView: {
    width: width,
    backgroundColor:'transparent'
  },
  otherView: {
    width: 32,
    height: 32,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor:'#fff'
  }
})

export default connect(state => ({
  data: state.MessageReducer
  }),
  (dispatch) => ({
    actions: bindActionCreators(MessageAction, dispatch)
  })
)(MessagePageNew)
