import _ from 'underscore'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'

import * as actions from '../../actions/dealAction'

import Loading from '../common/loading'
import Navigator from '../common/navigator'
import styles from '../../css/search/searchList.css'
import SearchTab from './searchTab'

class SearchList extends Component {

  render() {

    let deals = [1,2,3]

    if (deals.length > 0) {
      return (
        <div className='searchListView'>
          <SearchTab />
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

}

export default connect(state => ({
  data: state.DealReducer,
  }),
  (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(SearchList)
