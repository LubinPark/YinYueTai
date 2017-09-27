import _ from 'underscore'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import NavigationBar from 'react-native-navbar'

import * as AdressBookAction from '../../actions/adressBookAction'
import Loading from '../commonfile/loading'
import AdressBookItem from './adressBookItem'

import {
  View,
  Text,
  ListView,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
  InteractionManager
} from 'react-native'

let Device = require('../../utils/device')
let ds = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 })

const { width, height, fadeGray } = Device

class ChatPage extends Component {

  static contextTypes = {
    app: React.PropTypes.object
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this._refresh()
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

    let num = _.random(0, 2)

    if (!_.isEmpty(adressBook)) {
      return (
        <ListView
          contentContainerStyle={styles.listView}
          initialListSize={10}
          enableEmptySections={true}
          dataSource={ds.cloneWithRows(adressBook)}
          renderRow={(rowData)=>this._renderRow(rowData)}
          refreshControl={
            <RefreshControl
              tintColor={'#ccc'}
              refreshing={this.props.data.refresh}
              onRefresh={()=>this._refresh()}
            />
          }
        />
      )
    } else {
      if (this.props.data.noData === true) {
        return (
          <View style={styles.center}>
            <Text>没有联系人</Text>
          </View>
        )
      } else {
        return (
          <View style={styles.center}>
            <Loading num={num}/>
          </View>
        )
      }
    }
  }

  _refresh() {
    this.props.actions.fetchAdressBookIfNeeded({type:'getAdressBook'})
  }

  _renderRow(rowData) {
    return (
      <TouchableOpacity style={styles.rowDataView}
                        onPress={() => {this._toMessage(rowData)}}>
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
    height: height - 64 - 49,
  },
  center: {
    width: width,
    height: height - 64 - 49,
    alignItems: 'center',
    justifyContent: 'center'
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

export default connect(
  state => ({
    data: state.AdressBookReducer
  }),
  (dispatch) => ({
    actions: bindActionCreators(AdressBookAction, dispatch)
  })
)(ChatPage)
