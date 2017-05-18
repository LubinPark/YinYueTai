import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import styles from '../css/home.css'
import * as actions from '../actions/userAction'

class Home extends Component{

  componentWillMount() {
    this.props.actions.fetchUserIfNeeded({type: 'userInfo'})
  }

  render() {
    return (
      <div className={styles.root}>
        主页主页
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
