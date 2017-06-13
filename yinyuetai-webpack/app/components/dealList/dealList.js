import _ from 'underscore'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'

import DealCell from './dealCell'
import Loading from '../common/loading'

import * as actions from '../../actions/dealAction'

class DealList extends Component {

  componentDidMount() {
    let params = this.props.location.state.data.params
    this.props.actions.fetchDealIfNeeded({type: `getDeals`, params:params})
  }

  render() {

    let deals = this.props.data.deals

    if (deals.length > 0) {
      return (
        <div>
        {
          _.map(deals, (item, index) => {
            let url = `/detailDeal?dealId:` + item.id
            return (
              <Link to={url} key={index} style={{textDecoration: `blink`}}>
                <DealCell key={index} deal={item} onClick={(e)=>this._clickDeal(e, item)}/>
              </Link>
            )
          })
        }
        </div>
      )
    } else {
      return (
        <div className='center' style={{height: window.innerHeight}}>
          <Loading />
        </div>
      )
    }
  }

  _clickDeal(e, item) {
    this.props.actions.fetchDealIfNeeded({type: `saveDealDetail`, dealDetail: item})
  }

}

export default connect(state => ({
  data: state.DealReducer,
  }),
  (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(DealList)
