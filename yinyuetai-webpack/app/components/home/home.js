import _ from 'underscore'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'

import * as actions from '../../actions/dealAction'

import styles from '../../css/home/home.css'
import DealCell from './dealCell'

class Home extends Component {

  componentWillMount() {
    this.props.actions.fetchDealIfNeeded({type: 'getDeals'})
  }

  render() {

    let deals = this.props.data.deals

    if (deals.length > 0) {
      return (
        <div>
        {
          _.map(deals, (item, index) => {
            return (
              <Link to='/detailDeal' key={index} style={{textDecoration: 'blink'}}>
                <DealCell key={index} deal={item} onClick={(e)=>this._clickDeal(e, item)}/>
              </Link>
            )
          })
        }
        </div>
      )
    } else {
      return (
        <div>
        </div>
      )
    }
  }

  _clickDeal(e, item) {
    this.props.actions.fetchDealIfNeeded({type: 'saveDealDetail', dealDetail: item})
  }

}

export default connect(state => ({
  data: state.DealReducer,
  }),
  (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(Home)
