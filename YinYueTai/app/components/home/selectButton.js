import React,{Component} from 'react'
import _ from 'underscore'
import {
  Text,
  View,
  Image,
  ListView,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from 'react-native'

const {width,height} = Dimensions.get('window')

export default class SelectButton extends Component {

  render() {
    var data = this.props.data
    if (_.isEmpty(data)) {
      return (
        <View>
        </View>
      )
    } else {
      return (
        <View style={[styles.view]}>
        {
          _.map(data, (item, index) => {
            return (
              <TouchableOpacity  key={item.icon}>
                <View style={styles.item}>
                <Image source={{uri:item.icon}} style={styles.button} />
                <Text style={styles.title}>{item.title}</Text>
                </View>
              </TouchableOpacity>
            )
          })
        }
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  view: {
    width: width,
    height: width / 3,
    flexDirection: 'row',
    backgroundColor:'#ffffff'
  },
  item: {
    alignItems:'center',
    width:width / 3,
    height:width / 3,
  },
  button: {
    marginTop: 20,
    width:width / 8,
    height:width / 8,
    flexWrap: 'wrap',
  },
  title: {
    color:'gray',
    fontSize: 12,
    marginTop: 10,
    alignItems:'center'
  }
})
