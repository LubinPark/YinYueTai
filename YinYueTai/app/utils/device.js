import { Dimensions, StyleSheet, Platform } from 'react-native'

const { width, height } = Dimensions.get('window')

const isAndroid = (Platform.OS === 'android')

const backView = {
  width: 30,
  height: 30,
  marginTop: 5,
  marginLeft: 5,
  tintColor: '#fff'
}

const borderTop = {
  borderTopColor: '#ccc',
  borderTopWidth:StyleSheet.hairlineWidth
}

const borderBottom = {
  borderBottomColor: '#ccc',
  borderBottomWidth:StyleSheet.hairlineWidth
}

const border = {
  borderColor: '#ccc',
  borderWidth: StyleSheet.hairlineWidth
}

module.exports = {
  width:width,
  height:height,
  itemWidth: (width - 30) / 2,

  isAndroid: isAndroid,

  black: '#525252',
  darkBlack: 'rgba(0,0,0,1)',
  alpha0:'rgba(0,0,0,0)',

  purpure: 'rgb(59,46,69)',
  green: 'rgb(44,179,147)',
  darkGreen: 'rgb(8,39,51)',
  fadeGreen: 'rgb(176,229,110)',

  darkGray: '#ccc',
  gray: 'rgb(182,182,182)',
  lightGray: '#666',
  fadeGray: 'rgb(248,248,248)',

  border: border,
  backView: backView,
  borderTop: borderTop,
  borderBottom: borderBottom
}
