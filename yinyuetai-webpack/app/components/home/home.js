import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from '../../actions/userAction'

import DealOfUserInfo from './dealOfUserInfo'
import DealOfInfo from './dealOfInfo'
import styles from '../../css/home.css'

class Home extends Component{

  componentWillMount() {
    this.props.actions.fetchUserIfNeeded({type: 'userInfo'})
  }

  render() {
    return (
      <div className='root'>
        <h1>主页主页</h1>
        <div>
          <DealOfUserInfo />
          <DealOfInfo />
        </div>
      </div>
    )
  }

}

export default connect(state => ({
  data: state.UserReducer,
  }),
  (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(Home)
