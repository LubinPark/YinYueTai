import _ from 'underscore'
import React, { Component } from 'react'

import * as actions from '../../actions/detailDealAction'
import styles from '../../css/detailDeal/productInfo.css'

class ProductOfInfo extends Component {

  render() {
    return (
      <div className='product'>
        <div className='productInfoTitle'>产品信息</div>
        <div className='productInfo'>
          <img className='productImg' src='../../img/userhead.png'/>
          <div className='productDetail'>
            <div className='productBrand'>Hola</div>
            <div className='productTitle'>美白面膜</div>
            <div className='netWeight'>
              <div className='netWeightTitle'>规格</div>
              <div className='netWeightValue'>200ml</div>
            </div>
          </div>
        </div>
        <div className='detailView'>
          <Detail title='起订量' value='1'/>
          <div className='line'></div>
          <Detail title='库存量' value='480'/>
        </div>
        <div className='detailView' style={{marginBottom: '15px'}}>
          <Detail title='保质期至' value='2018/5/14'/>
        </div>
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
    return (
      <div style={{width: this.state.width}} className='detail'>
        <div>
          <div className='detail'>
            <div className='prodDetailTitle'>{this.props.title}</div>
          </div>
          <div className='detail'>
            <div className='prodDetailValue'>{this.props.value}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default ProductOfInfo
