import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'

import * as actions from '../../actions/dealAction'
import styles from '../../css/home/home.css'
import Navigator from '../common/navigator'
import ProductOfInfo from './productInfo'
import DetailInfo from './detailInfo'
import DetailSupply from './detailSupply'
import DetailUser from './detailUser'

class DetailDeal extends Component {

  componentDidMount() {
    let dealId = this.props.data.dealDetail.id
    this.props.actions.fetchDealIfNeeded({type: 'getDealDetail', dealId: dealId})
  }

  render() {

    let deal = this.props.data.dealDetail
    let color = (deal.attributes.dealType === '卖') ? '#73e2ff' : '#ffd149'

    return (
      <div className='detailInfo'>
        <Link to='/' style={{textDecoration: 'blink'}}>
          <Navigator title="采购详情" navBgcolor={color} backImgColor='write' titleColor='#fff'/>
        </Link>
        <div style={{'marginTop':10,'display':'flex'}}></div>
        <ProductOfInfo deal={deal}/>
        <DetailInfo deal={deal}/>
        <DetailSupply deal={deal}/>
        <DetailUser deal={deal}/>
      </div>
    )
  }

}

export default connect(state => ({
  data: state.DealReducer,
  }),
  (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(DetailDeal)
