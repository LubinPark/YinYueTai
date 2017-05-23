import React, { Component } from 'react'

import styles from '../../css/home/dealOfProduct.css'

class DealOfProduct extends Component {

  render() {
    return (
      <div className='productOfCell'>
        <img className='productOfImg' src='../../img/userhead.png' alt='picture' />
        <div className='productOfInfo'>
          <div className='productTitle'>标题标题标题标题标题</div>
          <div className='down'>
            <div className='left'>
              <Detail title='产地' value='悉尼' />
              <Detail title='分类' value='进口美食' />
            </div>
            <div className='right'>
              <div className='quantityTitle'>起订量</div>
              <div className='quantityValue'>1</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

class Detail extends Component {
  render () {
    return (
      <div className='homeDetail'>
        <div className='detailTitle'>{this.props.title}：</div>
        <div className='detailValue'>{this.props.value}</div>
      </div>
    )
  }
}

export default  DealOfProduct
