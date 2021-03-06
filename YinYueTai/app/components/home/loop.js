import _ from 'underscore'
import React, { Component } from 'react'
import Swiper from 'react-native-swiper'

import {
  Text,
  View,
  Image,
  StyleSheet
} from 'react-native'

let Device = require('../../utils/device')
const { width, height, alpha0 } = Device

 export default class Loop extends Component {

  render() {
    if (_.isEmpty(this.props.data)) {
      return (
        <View/>
      )
    } else {
      return (
        <Swiper autoplay={true}
                autoplayTimeout={2}
                height={viewHeight}
                showsPagination={false}
        >
        {
          _.map(this.props.data,(item,index) => {
            return (
              <Image source={{uri:item.posterPic}}
                     key={index}
                     style={[styles.image, styles.container]}>
                <View style={styles.bottom}>
                  <View style={styles.left}>
                    <Text style={styles.title}
                          allowFontScaling={false}
                          numberOfLines={1}>{item.title}</Text>
                    <View style={styles.artistNameView}>
                    {
                      _.map(item.artists, (i ,index) => {
                        return (
                          <Text key={i.artistId}
                                style={styles.artistName}
                                allowFontScaling={false}
                                numberOfLines={1}>
                            {i.artistName}
                          </Text>
                        )
                      })
                    }
                    </View>
                  </View>
                  <View style={styles.loopView}>
                    <Text style={styles.pageTotal}
                          allowFontScaling={false}
                          numberOfLines={1}>{index + 1}/10</Text>
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

const viewHeight = width * 0.5555
const styles = StyleSheet.create({
  image:{
    width: width,
    resizeMode:'cover'
  },
  bottom: {
    width:width,
    height: 40,
    marginTop: viewHeight - 40,
    flexDirection:'row',
    backgroundColor:'rgba(0,0,0,0.2)'
  },
  left:{
    width:width / 3 * 2,
    height: 40
  },
  artistNameView:{
    width: width / 4 * 3,
    height: 15,
    flexDirection:'row',
    backgroundColor:alpha0
  },
  loopView: {
    width:width / 3,
    alignItems:'flex-end',
    marginTop: 13
  },
  title: {
    height: 16,
    marginLeft: 10,
    marginBottom: 5,
    fontSize: 15,
    width: width / 3 * 2,
    color: '#ffffff',
    backgroundColor:alpha0
  },
  artistName: {
    color:'#00CD66',
    fontSize: 13,
    marginLeft: 10,
    flexDirection:'row',
  },
  pageTotal: {
    fontSize: 11,
    marginRight: 10,
    color: '#ffffff',
    alignItems:'flex-end',
    backgroundColor:alpha0
  }
})
