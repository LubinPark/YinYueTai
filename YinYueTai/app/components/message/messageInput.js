import _ from 'underscore'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'

import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

import * as MessageAction from '../../actions/messageAction'

var Device = require('../../utils/device')
const { width, height, fadeGray, gray, border } = Device

class MessageInput extends Component {

  static contextTypes = {
    app: React.PropTypes.object
  }

  constructor(props) {
    super(props)
    this.state = {
      text: ''
    }
  }

  render() {
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

          onBlur={(e)=>this.props.onBlur(e)}
          onFocus={(e)=>this.props.onFocus(e)}
          onChangeText={text => this._onChangeText(text)}
          enablesReturnKeyAutomatically={true}
          underlineColorAndroid="transparent"
          onSubmitEditing={()=>this._sendMessage()}
        />
        <View style={[styles.otherView,border]}>
          <TouchableOpacity onPress={()=>this._sendMessage(this.props.currentUser, this.props.senderUser, this.props.conversation)}>
            <Text style={{fontSize: 14,textAlign:'center'}}>发送</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
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
}

const styles = StyleSheet.create({
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
  }
})

export default connect(state => ({
  data: state.MessageReducer
  }),
  (dispatch) => ({
    actions: bindActionCreators(MessageAction, dispatch)
  })
)(MessageInput)
