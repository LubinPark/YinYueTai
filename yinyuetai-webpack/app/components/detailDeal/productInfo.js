import _ from 'underscore'
import React, { Component } from 'react'

import Func from '../../unit'
import styles from '../../css/detailDeal/productInfo.css'

class ProductOfInfo extends Component {

  render() {

    let deal = this.props.deal.attributes
    let product = deal.products[0].attributes
    let createdAt = this.props.deal.createdAt
    let productQuantity = deal.product_quantity ? deal.product_quantity : `未填写`
    let pic = product.thumbnail ? product.thumbnail.attributes.url : `./img/userhead.png`
    let dealType = deal.dealType
    let title = `产品信息`
    let color = (dealType === `卖`) ? `#51acf2` : `#f8c027`

    return (
      <div className='product'>
        <div className='productInfoTitle'>{title}</div>
        <div className='productInfo'>
          <img className='productImg' src={pic}/>
          <div className='productDetail'>
            <div className='productBrand'>{product.brand}</div>
            <div className='productTitle' style={{color:color}}>{product.name}</div>
            <div className='netWeight'>
              <div className='netWeightTitle'>规格</div>
              <div className='netWeightValue'>{product.net_weight}</div>
            </div>
          </div>
        </div>
        {(dealType === `卖`) &&
          <div className='detailView'>
            <Detail title='起订量' value={deal.product_min_quantity} />
            <div className='line'></div>
            <Detail title='库存量' value={productQuantity} />
          </div> }
        {(dealType === `卖`) &&
          <div className='detailView' style={{marginBottom: '15px'}}>
            <Detail title='保质期至' value={Func.parseTime(createdAt)} />
          </div> }
        {(dealType === `买`) &&
          <div className='detailView' style={{marginBottom: '15px'}}>
            <Detail title='采购量' value={deal.product_min_quantity} color={color}/>
          </div> }
      </div>
    )
  }

}

class Detail extends Component {

  constructor(props) {
    super(props)
    this.state = {
      width: (window.innerWidth / 2)
    }
  }

  render() {

    let color = this.props.color

    return (
      <div style={{width: this.state.width}} className='detail'>
        <div>
          <div className='detail'>
            <div className='prodDetailTitle'>{this.props.title}</div>
          </div>
          <div className='detail'>
            <div className='prodDetailValue' style={{color: color}}>{this.props.value}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default ProductOfInfo
