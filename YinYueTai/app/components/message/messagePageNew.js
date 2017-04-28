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

import {
  View,
  Text,
  Image,
  ListView,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback
} from 'react-native'

var Device = require('../../utils/device')
var ds = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 })
const { width, height, backView } = Device

class MessagePageNew extends Component {

  static contextTypes = {
    app: React.PropTypes.object
  }

  render() {

    console.log(this.props);

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
          statusBar={{style: 'light-content'}} />
        <Image style={styles.backgroundImg} source={require('../../img/background/background_0.png')}>
          <ScrollView
            bounces={false}
            ref='scrollView'
            keyboardDismissMode="interactive"
            keyboardShouldPersistTaps='handled'
            contentContainerStyle={styles.crollView}
          >
          {this._messageList(message)}
          {this._InputView()}
          </ScrollView>
        </Image>
      </View>
    )
  }

  _messageList(message) {
    return (
      <ListView
        style={styles.messageListView}
        dataSource={ds.cloneWithRows(message)}
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

  _InputView() {
    return (
      <MessageInput  {...this.props} onFocus={(e)=>this._onFocus(e)} onBlur={(e)=>this._onBlur(e)} />
    )
  }

  _onFocus(e) {
    this.refs[`scrollView`].scrollTo({x:0, y: 215, animated: true})
  }

  _onBlur(e) {
    this.refs[`scrollView`].scrollTo({x:0, y: 0, animated: true})
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
  }
})

export default connect(state => ({
  data: state.MessageReducer
  }),
  (dispatch) => ({
    actions: bindActionCreators(MessageAction, dispatch)
  })
)(MessagePageNew)
