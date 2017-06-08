import _ from 'underscore'
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
    let idString = this.props.location.search
    let id = idString.substring(idString.indexOf(':') + 1, idString.length)
    let dealId = this.props.data.dealDetail.id ? this.props.data.dealDetail.id : id
    // this.props.actions.fetchDealIfNeeded({type: `getDealDetail`, dealId: dealId})
  }

  //去掉navigator
  // <Link to='/' style={{textDecoration: `blink`}}>
  //   <Navigator title="采购详情" navBgcolor={color} backImgColor='write' titleColor='#fff'/>
  // </Link>

  render() {

    let deal = this.props.data.dealDetail

    if (_.isEmpty(deal)) {
      return <div/>
    } else {

      let color = (deal.attributes.dealType === `卖`) ? `#73e2ff` : `#ffd149`
      let user = deal.attributes.user
      let userId = user.id
      let url = `/user?userId:` + userId

      return (
        <div className='detailInfo'>
        <div style={{height:10}}/>
          <ProductOfInfo deal={deal}/>
          <DetailInfo deal={deal}/>
          <DetailSupply deal={deal}/>
          <div onClick={()=>this._clickUser(user)}>
            <Link to={url} style={{textDecoration: `blink`}}>
              <DetailUser user={user} />
            </Link>
          </div>
        </div>
      )
    }
  }

  _clickUser(user) {
    this.props.actions.fetchDealIfNeeded({type: `saveUser`, user: user})
  }

}

export default connect(state => ({
  data: state.DealReducer,
  }),
  (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(DetailDeal)
