import { connect } from 'react-redux'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'

import * as actions from '../../actions/detailDealAction'
import styles from '../../css/home/home.css'
import ProductOfInfo from './productInfo'
import DetailInfo from './detailInfo'
import DetailSupply from './detailSupply'
import DetailUser from './detailUser'

class DetailDeal extends Component {

  render() {
    return (
      <div className='detailInfo' onClick={(e)=>this._clickDeal(e)}>
        <ProductOfInfo />
        <DetailInfo />
        <DetailSupply />
        <DetailUser />
      </div>
    )
  }

  _clickDeal(e, item) {
    // console.log(`click`);
  }

}

export default connect(state => ({
  data: state.UserReducer,
  }),
  (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(DetailDeal)
