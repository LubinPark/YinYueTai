import _ from 'underscore'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'

import * as actions from '../../actions/userAction'
import styles from '../../css/user/user.css'

import Loading from '../common/loading'
import DealCell from '../dealList/dealCell'
import DetailUser from '../detailDeal/detailUser'

class UserPage extends Component {

  componentWillMount() {
    this.props.actions.fetchUserIfNeeded({type: `cleanUser`})
  }

  componentDidMount() {
    let idString = this.props.location.search
    let userId = idString.substring(idString.indexOf(':') + 1, idString.length)
    this.props.actions.fetchUserIfNeeded({type: `getUserByUserId`, userId: userId})
  }

  render() {

    let user = this.props.data.user
    let deals = this.props.data.deals

    if (_.isEmpty(user)) {
      return (
        <div className='center' style={{height: window.innerHeight}}>
          <Loading />
        </div>
      )
    } else {
      return (
        <div className='userPage'>
          <DetailUser user={user} />
          <div className='userPagePublishText'>TA发布的买卖</div>
          {this._userListDeal(deals)}
        </div>
      )
    }
  }

  _userListDeal(deals) {
    if (deals.length > 0) {
      return (
        <div style={{backgroundColor:'#fff'}}>
        {
          _.map(deals, (item, index) => {
            let url = `/detailDeal?dealId:` + item.id
            return (
              <DealCell key={index} deal={item} onClick={()=>this._onClick()}/>
            )
          })
        }
        </div>
      )
    } else {
      return (
        <div className='userPagePublishText'>未发布买卖</div>
      )
    }
  }

  _onClick() {}

}

export default connect(state => ({
  data: state.UserReducer
  }),
  (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(UserPage)
