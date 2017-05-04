import _ from 'underscore'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import NavigationBar from 'react-native-navbar'

import * as AdressBookAction from '../../actions/adressBookAction'
import AdressBookItem from './adressBookItem'

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

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.props.actions.fetchAdressBookIfNeeded({type:'getAdressBook'})
    })
  }

  render() {

    let adressBook = this.props.data.adressBook
    let titleConfig = { title: '通讯录', tintColor: '#fff' }

    return (
      <View style={styles.loadingView}>
        <NavigationBar
          title ={titleConfig}
          tintColor={'black'}
          statusBar={{style: 'light-content'}}/>
        <View style={styles.ListView}>
          {this._adressBook(adressBook)}
        </View>
      </View>
    )
  }

  _adressBook(adressBook) {
    if (!_.isEmpty(adressBook)) {
      return (
        <ListView
          style={styles.listView}
          initialListSize={10}
          enableEmptySections={true}
          dataSource={ds.cloneWithRows(adressBook)}
          renderRow={(rowData)=>this._renderRow(rowData)}
        />
      )
    }
  }

  _renderRow(rowData) {
    return (
      <TouchableOpacity style={styles.rowDataView} onPress={() => {this._toMessage(rowData)}}>
        <AdressBookItem data={rowData}/>
      </TouchableOpacity>
    )
  }

  _toMessage(rowData) {
    this.props.actions.fetchAdressBookIfNeeded({
      type: 'pushToMessage',
      senderUser: rowData,
      navigator:this.context.app.navigator
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
  data: state.AdressBookReducer,
  }),
  (dispatch) => ({
    actions: bindActionCreators(AdressBookAction, dispatch)
  })
)(ChatPage)
