import React, { Component } from 'react'

import DealOfUserInfo from './dealOfUserInfo'
import DealOfInfo from './dealOfInfo'
import DealOfProduct from './DealOfProduct'
import styles from '../../css/home/home.css'

class DealCell extends Component {

  render() {
    return (
      <div onClick={(e)=>this._clickDeal(e)}>
        <DealOfUserInfo />
        <DealOfInfo />
        <DealOfProduct />
        <div className='cellSeparator'></div>
      </div>
    )
  }

  _clickDeal(e) {
    this.props.onClick(e)
  }

}

export default DealCell
