import React, { Component } from 'react'

import styles from '../../css/home/home.css'

class Navigator extends Component {

  render() {

    let backImgColor = this.props.backImgColor
    let titleColor = this.props.titleColor
    let navBgcolor = this.props.navBgcolor

    return (
      <div className='navigator' style={{backgroundColor:navBgcolor}}>
        {(backImgColor === 'write') &&
          <img className='backImg' src='../../img/back_write.png'/> }
        {(backImgColor === 'black') &&
          <img className='backImg' src='../../img/back_black.png'/> }
        <div className='navigatorTitle' style={{color: titleColor}}>{this.props.title}</div>
      </div>
    )
  }

}

export default Navigator
