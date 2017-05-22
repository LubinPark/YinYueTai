import React, { Component } from 'react'

import DealOfUserInfo from './dealOfUserInfo'
import DealOfInfo from './dealOfInfo'
import DealOfProduct from './DealOfProduct'

class DealCell extends Component {

  render() {
    return (
      <div>
        <DealOfUserInfo />
        <DealOfInfo />
        <DealOfProduct />
      </div>
    )
  }

}

export default DealCell
