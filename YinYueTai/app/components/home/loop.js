import React,{Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Swiper from 'react-native-swiper'
import _ from 'underscore'

const {width,height} = Dimensions.get('window')

import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  InteractionManager
} from 'react-native'

 export default class Loop extends Component {

  render() {
    if (_.isEmpty(this.props.data)) {
      return (
        <View>
        </View>
      )
    } else {
      return (
        <Swiper style={styles.container}
                autoplay={true}
                autoplayTimeout = {1.8}
        >
        {
          _.map(this.props.data,(item,index) => {
            return (
              <Image source={{uri:item.posterPic}} key={index} style={[styles.image,styles.container]}>
                <View style={styles.bottom}>
                  <View style={styles.left}>
                    <Text style={styles.title}>{item.title}</Text>
                    <View style={styles.artistNameView}>
                    {
                      _.map(item.artists, (i ,index) => {
                        return (
                            <Text style={styles.artistName} key={i.artistId}>{i.artistName}</Text>
                        )
                      })
                    }
                    </View>
                  </View>
                  <View style={styles.loopView}>
                    <Text style={styles.pageTotal}>{index + 1}/10</Text>
                  </View>
                </View>
              </Image>
            )
          })
        }
        </Swiper>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    height: 210,
    backgroundColor:'#ffffff'
  },
  image:{
    width: width,
    resizeMode:'cover'
  },
  bottom: {
    width:width,
    height: 40,
    marginTop: 170,
    marginLeft: 10,
    flexDirection:'row'
  },
  left:{
    width:width / 3 * 2 - 10,
    height: 40
  },
  artistNameView:{
    width: width / 3 * 2 - 10,
    height: 15,
    flexDirection:'row',
    backgroundColor:'rgba(0,0,0,0)'
  },
  loopView: {
    width:width / 3,
    alignItems:'flex-end',
    marginTop: 13
  },
  title: {
    height: 16,
    marginBottom: 5,
    fontSize: 15,
    width: width / 3 * 2 - 10,
    color: '#ffffff',
    backgroundColor:'rgba(0,0,0,0)'
  },
  artistName: {
    color:'green',
    fontSize: 13,
    flexDirection:'row',
  },
  pageTotal: {
    fontSize: 11,
    marginRight: 10,
    color: '#ffffff',
    alignItems:'flex-end',
    backgroundColor:'rgba(0,0,0,0)'
  }
})
