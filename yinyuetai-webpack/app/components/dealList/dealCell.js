import React, { Component } from 'react'

import DealOfUserInfo from './dealOfUserInfo'
import DealOfInfo from './dealOfInfo'
import DealOfProduct from './DealOfProduct'
import styles from '../../css/dealList/dealList.css'

class DealCell extends Component {

  render() {
    let deal = this.props.deal
    return (
      <div onClick={(e)=>this._clickDeal(e)}>
        <DealOfUserInfo deal={deal} />
        <DealOfInfo deal={deal} />
        <DealOfProduct deal={deal} />
        <div className='cellSeparator' />
      </div>
    )
  }

  _clickDeal(e) {
    this.props.onClick(e)
  }

}

export default DealCell
