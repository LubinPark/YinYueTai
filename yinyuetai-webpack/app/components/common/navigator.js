import React, { Component } from 'react'

import styles from '../../css/common/navigator.css'

class Navigator extends Component {

  render() {

    let backImgColor = this.props.backImgColor
    let titleColor = this.props.titleColor
    let navBgcolor = this.props.navBgcolor
    let showBack = (this.props.showBack == true) ? true : false

    return (
      <div className='navigator' style={{backgroundColor:navBgcolor}}>
        {showBack && (backImgColor === `write`) &&
          <div className='backImgWrite' /> }
        {showBack && (backImgColor === `black`) &&
          <div className='backImgBlack' /> }
        {!showBack &&
          <div className='backImgNone' /> }
        <div className='navigatorTitle' style={{color: titleColor}}>{(!!this.props.title) && this.props.title.toString()}</div>
      </div>
    )
  }

}

export default Navigator
