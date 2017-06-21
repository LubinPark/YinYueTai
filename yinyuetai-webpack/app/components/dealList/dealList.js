import _ from 'underscore'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'

import * as actions from '../../actions/dealAction'

import DealCell from './dealCell'
import Loading from '../common/loading'
import Navigator from '../common/navigator'

class DealList extends Component {

  componentDidMount() {
    let state = this.props.location.state
    let params = state ? state.data.params : false
    params && this.props.actions.fetchDealIfNeeded({type: `destoryDealList`})
    params && this.props.actions.fetchDealIfNeeded({type: `saveParams`, params: params})
    params && this.props.actions.fetchDealIfNeeded({type: `getDeals`, params:params, title: state.data.name})
  }

  render() {

    let color = `#fff`
    let { deals, title, showMore } = this.props.data

    if (deals.length > 0) {
      return (
        <div>
          <div style={{height:44}} />
          <Navigator title={title} showBack={false}
                     navBgcolor={color} backImgColor='write' titleColor='#666'/>
          {
            _.map(deals, (item, index) => {
              let url = `/detailDeal?dealId:` + item.id
              return (
                <Link to={url} key={index} style={{textDecoration: `blink`}}>
                  <DealCell deal={item} onClick={(e)=>this._clickDeal(e, item)}/>
                </Link>
              )
            })
          }
          { (showMore == true) &&
            <div className='loadingMore' onClick={()=>this._loadMore(deals.length)}>加载更多</div> }
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

  _loadMore(skip) {
    let state = this.props.location.state
    let param = state ? state.data.params : false
    let params = Object.assign({}, param, {skip: skip})
    this.props.actions.fetchDealIfNeeded({type: `loadingMore`, params: params })
  }

}

export default connect(state => ({
  data: state.DealReducer,
  }),
  (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(DealList)
