import _ from 'underscore'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'

import * as actions from '../../actions/dealAction'

import styles from '../../css/home/home.css'
import DealCell from './dealCell'

class Home extends Component {

  constructor(props) {
    super(props)
  }

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
    // console.log(item);
  }

}

export default connect(state => ({
  data: state.DealReducer,
  }),
  (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(Home)
