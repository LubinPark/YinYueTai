import React, { Component } from 'react'

import {
  View,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

let Device = require('../../utils/device')
const { itemHeight, width, height, black, isAndroid } = Device

export default class TopView extends Component {

  constructor(props) {
    super(props)
    this.state = {
      text: '输入艺人、MV或者悦单名称'
    }
  }

  render () {
    return (
      <View style={styles.topView}>
        <View style={styles.searchButton}>
          <Image style={styles.search_icon}
                 source={require('../../img/search.png')}  />
          <TextInput style={styles.search_text}
                     numberOfLines={1}
                     multiline={false}
                     placeholder={this.state.text}
                     clearButtonMode='while-editing'
                     underlineColorAndroid="transparent"
          />
        </View>
        <View style={styles.historyView}>
          <TouchableOpacity>
            <Image style={styles.history}
                   source={require('../../img/history.png')} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  topView: {
    width:width,
    height: isAndroid ? 44 : 64,
    flexDirection:'row',
    backgroundColor: 'black'
  },
  searchButton: {
    height: 32,
    marginTop: isAndroid ? 4 : 23,
    marginLeft: 15,
    borderRadius: 16,
    width:width / 4 * 3,
    flexDirection:'row',
    backgroundColor:'#ffffff'
  },
  search_icon: {
    width: 25,
    height: 25,
    marginTop: 4,
    marginLeft: 4
  },
  search_text: {
    height: 35,
    fontSize: 12,
    color: black,
    marginTop: -1,
    width: width / 4 * 3 - 30
  },
  historyView: {
    flex:1,
    marginRight: 15,
    alignItems:'flex-end'
  },
  history: {
    width: 30,
    height: 30,
    marginTop: isAndroid ? 4 : 23
  }
})
