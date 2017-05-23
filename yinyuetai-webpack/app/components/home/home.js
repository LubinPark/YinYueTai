import _ from 'underscore'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'

import * as actions from '../../actions/userAction'

import styles from '../../css/home/home.css'
import DealCell from './dealCell'

class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: [1,2,3,4,5]
    }
  }

  componentWillMount() {
    // this.props.actions.fetchUserIfNeeded({type: 'userInfo'})
  }

  render() {
    return (
      <div>
      {
        _.map(this.state.data, (item, index) => {
          return (
            <Link to='/detailDeal' key={index}>
              <DealCell key={index} onClick={(e)=>this._clickDeal(e, item)}/>
            </Link>
          )
        })
      }
      </div>
    )
  }

  _clickDeal(e, item) {
    console.log(item);
  }

}

export default connect(state => ({
  data: state.UserReducer,
  }),
  (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(Home)
