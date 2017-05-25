import React, { Component } from 'react'

import styles from '../../css/home/home.css'

class Navigator extends Component {

  render() {
    return (
      <div className='navigator'>
        <img className='backImg' src='../../img/back.png'/>
        <div className='navigatorTitle'>{this.props.title}</div>
      </div>
    )
  }

}

export default Navigator
