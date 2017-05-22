import _ from 'underscore'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from '../../actions/userAction'

import styles from '../../css/home/home.css'
import DealCell from './dealCell'
class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: [1,2,3,4,5,6,7,8,9,10]
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
            <DealCell key={index} onClick={(e)=>this._clickDeal(e)}/>
          )
        })
      }
      </div>
    )
  }

  _clickDeal(e) {
    console.log(e);
  }

}

export default connect(state => ({
  data: state.UserReducer,
  }),
  (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(Home)
