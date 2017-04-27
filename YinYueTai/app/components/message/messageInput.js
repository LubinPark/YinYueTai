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
const { width, height, fadeGray, backView, gray, lightGray, border } = Device

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
            placeholder=''
            multiline={true}
            placeholderTextColor={gray}
            style={[styles.inputView,border]}
            onChange={(e) => this._onChange(e)}
            onChangeText={text => this._onChangeText(text)}
            enablesReturnKeyAutomatically={true}
            underlineColorAndroid="transparent"
          />
          <View style={[styles.otherView,border]}>
            <TouchableOpacity onPress={()=>this._sendMessage()}>
              <Text style={{fontSize: 14,textAlign:'center'}}>发送</Text>
            </TouchableOpacity>
          </View>
        </View>
    )
  }

  _onChange(e) {
    const contentSize = e.nativeEvent.contentSize;
  }

  _onChangeText(text) {
    this.setState({
      text: text
    })
  }

  _sendMessage() {
    let message = this.state.text
    this.props.actions.fetchMessageActionIfNeeded({type:'sendMessage', message:message})
    this.setState({
      text: ''
    })
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
    paddingTop: 4,
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
