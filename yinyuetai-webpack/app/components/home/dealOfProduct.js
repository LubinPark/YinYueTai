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
    let product = deal.products[0].attributes
    let color = (deal.dealType === `卖`) ? `#51acf2` : `#f8c027`
    let pic = product.thumbnail ? product.thumbnail.attributes.url : false

    return (
      <div className='productOfCell'>
      {pic ? <img className='productOfImg' src={pic}/>
           : <img className='productOfImgLocal' /> }
        <div className='productOfInfo'>
          <div className='productTitle' style={{width: this.state.width, color: color}}>{deal.searchable}</div>
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
                <div className='quantityValue' style={{color: color}}>{deal.product_min_quantity}</div>
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
