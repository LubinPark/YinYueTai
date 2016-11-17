import React,{Component} from 'react'
import {
  View,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

var Device = require('../../utils/device')
var {itemHeight,width,height,gray,black} = Device

export default class TopView extends Component {

  constructor(props) {
    super(props)
    this.state ={
      text: '输入艺人、MV或者悦单名称'
    }
  }

  render () {
    return (
      <View style={styles.topView}>
        <View style={styles.searchButton}>
          <Image source={require('../../img/search.png')} style={styles.search_icon} />
          <TextInput style={styles.search_text}
                     numberOfLines={1}
                     placeholder={this.state.text}
                     clearButtonMode='while-editing'
          />
        </View>
        <View style={styles.historyView}>
          <TouchableOpacity>
            <Image source={require('../../img/history.png')} style={styles.history} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  topView: {
    width:width,
    height: 64,
    flexDirection:'row',
    backgroundColor:"black"
  },
  searchButton: {
    height: 32,
    marginTop: 23,
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
    color: gray,
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
    marginTop: 23
  }
})
