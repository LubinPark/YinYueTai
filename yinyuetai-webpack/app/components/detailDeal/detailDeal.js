import _ from 'underscore'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'

import * as actions from '../../actions/dealAction'

import styles from '../../css/dealList/dealList.css'
import Navigator from '../common/navigator'
import ProductOfInfo from './productInfo'
import DetailInfo from './detailInfo'
import DetailSupply from './detailSupply'
import DetailUser from './detailUser'
import Func from '../../unit'

class DetailDeal extends Component {

  componentWillMount() {
    this.props.actions.fetchDealIfNeeded({type: `destoryDetailDeal`})
  }

  componentDidMount() {
    let idString = this.props.location.search
    let id = idString.substring(idString.indexOf(':') + 1, idString.length)
    this.props.actions.fetchDealIfNeeded({type: `getDealDetail`, dealId: id})
  }

  render() {

    let deal = this.props.data.dealDetail

    if (_.isEmpty(deal)) {
      return <div/>
    } else {

      let color = (deal.attributes.dealType === `卖`) ? `#73e2ff` : `#ffd149`
      let user = deal.attributes.user
      let userId = user.id
      let url = `/user?userId:` + userId
      let valid = Func.isValid(deal.attributes.validDate)
      color = deal.attributes.deleted ? '#ae3428' : (!valid ? '#ccc' : color)

      return (
        <div className='detailInfo'>
          <Navigator title="采购详情" showBack='false' navBgcolor={color} backImgColor='write' titleColor='#fff'/>
          <div style={{height:54}} />
          <ProductOfInfo deal={deal} />
          <DetailInfo deal={deal} />
          <DetailSupply deal={deal} />
          <Link to={url} style={{textDecoration: `blink`}}>
            <DetailUser user={user} />
          </Link>
        </div>
      )
    }
  }

}

export default connect(state => ({
  data: state.DealReducer,
  }),
  (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(DetailDeal)
