import React, { Component } from 'react'

import styles from '../../css/home/dealOfProduct.css'

class DealOfProduct extends Component {

  constructor(props) {
    super(props)
    this.state = {
      width: ((window.innerWidth) - 100)
    }
  }

  render() {

    let deal = this.props.deal.attributes
    let pic = deal.products[0].attributes.thumbnail ? deal.products[0].attributes.thumbnail.attributes.url : '../../img/userhead.png'

    return (
      <div className='productOfCell'>
        <img className='productOfImg' src={pic} alt='picture' />
        <div className='productOfInfo'>
          <div className='productTitle' style={{width: this.state.width}}>{deal.searchable}</div>
          <div className='down'>
            <div className='left'>
              <Detail title='产地' value={deal.product_origin} />
              <Detail title='分类' value={deal.product_category} />
            </div>
            <div>
              <div className='right'>
                <div className='quantityTitle'>起订量</div>
              </div>
              <div className='right'>
                <div className='quantityValue'>{deal.product_min_quantity}</div>
              </div>
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