import _ from 'underscore'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import NavigationBar from 'react-native-navbar'
import InvertibleScrollView from 'react-native-invertible-scroll-view'

import * as MessageAction from '../../actions/messageAction'
import Loading from '../commonfile/loading'
import MessageItem from './messageItem'

import {
  View,
  Text,
  Image,
  Keyboard,
  ListView,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  InteractionManager,
  TouchableWithoutFeedback
} from 'react-native'

var Device = require('../../utils/device')
var ds = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 })
const { width, height, backView, fadeGray, gray, border } = Device

class MessagePage extends Component {

  static contextTypes = {
    app: React.PropTypes.object
  }

  constructor(props) {
    super(props)
    this.state = {
      text: ''
    }
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.props.actions.fetchMessageActionIfNeeded({
        type: 'received',
        currentUser: this.props.currentUser,
        conversation: this.props.conversation,
        senderUser: this.props.senderUser
      })
    })
  }

  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow, this)
  }

  componentWillUnMount() {
    this.keyboardDidShowListener.remove()
  }

  _keyboardDidShow(e) {
    // 必须在创建之后才能，不然会报错，因为 componentWillMount 有时候scrollView没加载完成，强制动画，组件不存在
    if (!!this.refs[`scrollView`]) {
      this.refs[`scrollView`].scrollTo({x:0, y: e.endCoordinates.height, animated: true})
    }
  }

  render() {

    let messages = this.props.data.messages
    let currentUser = this.props.currentUser
    let senderUser = this.props.senderUser

    let titleConfig = { title: senderUser.get('username'), tintColor: '#fff' }
    let leftButtonConfig = <TouchableWithoutFeedback onPress={()=>this._back()}>
                            <Image source={require('../../img/back.png')} style={backView}/>
                           </TouchableWithoutFeedback>

    return (
      <View style={styles.container}>
        <NavigationBar
          title={titleConfig}
          tintColor={'black'}
          leftButton={leftButtonConfig}
          statusBar={{style: 'light-content'}} />
        <Image style={styles.backgroundImg} source={require('../../img/background/background_0.png')}>
          <ScrollView
            bounces={false}
            ref='scrollView'
            keyboardDismissMode="interactive"
            keyboardShouldPersistTaps='handled'
            contentContainerStyle={styles.crollView}
          >
          {this._messageList(messages)}
          {this._inputView(currentUser, this.props.senderUser, this.props.data.conversation)}
          </ScrollView>
        </Image>
      </View>
    )
  }

  _messageList(messages) {
    return (
      <ListView
        style={styles.messageListView}
        enableEmptySections={true}
        dataSource={ds.cloneWithRows(messages)}
        renderRow={(rowData)=>this._renderRow(rowData)}
        renderScrollComponent={props => <InvertibleScrollView {...props} inverted />}
      />
    )
  }

  _renderRow(rowData) {
    return (
      <MessageItem data={rowData}/>
    )
  }

  _inputView(currentUser, senderUser, conversation) {
    return (
      <View style={styles.inputContainerView}>
        <TextInput
          autoFocus={false}
          multiline={true}
          autoCorrect={false}
          clearTextOnFocus={true}

          placeholder=''
          returnKeyType='default'
          ref='messageTextInput'
          keyboardAppearance='dark'
          placeholderTextColor={gray}
          style={[styles.inputView,border]}

          onBlur={()=>this._onBlur()}
          onChangeText={text => this._onChangeText(text)}
          enablesReturnKeyAutomatically={true}
          underlineColorAndroid="transparent"
          onSubmitEditing={()=>this._sendMessage()}
        />
        <View style={[styles.otherView,border]}>
          <TouchableOpacity onPress={()=>this._sendMessage(currentUser, senderUser, conversation)}>
            <Text style={styles.sendView} allowFontScaling={false} numberOfLines={1}>发送</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  _onBlur() {
    this.refs[`scrollView`].scrollTo({x:0, y: 0, animated: true})
  }

  _onChangeText(text) {
    this.setState({
      text: text
    })
  }

  _sendMessage(currentUser, senderUser, conversation) {
    let message = this.state.text.trim()
    if (!_.isEmpty(message)) {
      this.props.actions.fetchMessageActionIfNeeded({
        type:'sendToMessage',
        message:message.trim(),
        currentUser: currentUser,
        senderUser: senderUser,
        conversation: conversation
      })
      this.setState({
        text: ''
      })
      this.refs['messageTextInput'].clear()
    }
  }

  _back() {
    this.context.app.navigator.pop()
    this.props.actions.fetchMessageActionIfNeeded({type: 'clearMessage'})
  }

}

const styles = StyleSheet.create({
  container: {
    width: width,
    height:height,
    backgroundColor:'#fff'
  },
  scrollView: {
    width: width,
    height: height - 64
  },
  backgroundImg: {
    position: 'absolute',
    top: 64,
    width: width,
    height: height - 64,
    backgroundColor:'transparent'
  },
  messageListView: {
    width: width,
    height: height - 64 - 49,
    backgroundColor:'transparent'
  },
  inputContainerView: {
    width: width,
    height:49,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:fadeGray,
    borderLeftColor: '#ccc',
    borderLeftWidth:StyleSheet.hairlineWidth
  },
  inputView: {
    flex: 1,
    height: 33,
    margin: 8,
    fontSize: 14,
    paddingLeft: 5,
    borderRadius: 3,
    backgroundColor:'#fff'
  },
  otherView: {
    height: 32,
    paddingHorizontal: 8,
    marginRight: 10,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor:'#fff'
  },
  sendView: {
    fontSize: 14,
    textAlign:'center'
  }
})

export default connect(state => ({
  data: state.MessageReducer
  }),
  (dispatch) => ({
    actions: bindActionCreators(MessageAction, dispatch)
  })
)(MessagePage)
