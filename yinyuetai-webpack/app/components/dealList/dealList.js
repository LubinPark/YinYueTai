import _ from 'underscore'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'

import * as actions from '../../actions/dealAction'

import DealCell from './dealCell'
import Loading from '../common/loading'
import Navigator from '../common/navigator'
import FilterLocation from '../common/filterLocation'
import FilterOfCheckBox from '../common/filterOfCheckBox'
import FilterOfRadioBox from '../common/filterOfRadioBox'

// 弹出层的初始化样式
const modalHeight = ((window.innerHeight / 5  * 3) <= 410) ? window.innerHeight / 5  * 3 : 410
const customStyles = {
  overlay : {
    position        : 'fixed',
    top             : 84,
    left            : 0,
    right           : 0,
    bottom          : 0,
    backgroundColor : 'rgba(0, 0, 0, 0.5)'
  },
  content : {
    position                : 'absolute',
    top                     : '0px',
    left                    : '0px',
    right                   : '0px',
    height                  : modalHeight,
    padding                 : '0px',
    borderRadius            : '0px',
    background              : '#fff',
    overflow                : 'auto',
    WebkitOverflowScrolling : 'touch',
    outline                 : 'none',
    border                  : '0px solid #fff'
  }
}

class DealList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      modalIsOpen: false,
      title: ``,
      select: ``,
      dealTypes: [`全部`,`采购`,`货源`],

      dealType: `全部`,
      location: `不限`,
      prepare_time : ``,
      product_origin: ``,
      delivery: [],
      skip: 0,
      product_category: ``,
      product_tags: [],
      product_min_quantity: 0
    }
  }

  componentWillMount() {
    this.props.actions.fetchDealIfNeeded({type: `getLocations`})
    this.props.actions.fetchDealIfNeeded({type: `getDefaultFilters`})
  }

  componentDidMount() {
    let string = this.props.location.search
    let type = string.substring(string.indexOf('?') + 1, string.indexOf(':'))
    let title = string.substring(string.indexOf(':') + 1, string.length)
    this._choiceType(title, type)
  }

  //进入页面判断当前的类型
  _choiceType(title, type) {
    if (type === `location`) {
      this.setState({
        title: title,
        location: title
      },()=>{
        this._loadingFunc()
      })
    } else if(type === `common`) {
      this.setState({
        title: title,
      },() => {
        this._loadingFunc()
      })
    }
  }

  //请求加载
  _loadingFunc() {
    let state = this.props.location.state
    let params = state ? state.data.params : false
    let paramsNew = Object.assign({}, this.state, params, this.props.data.params)
    let dealType = paramsNew.dealType

    if (dealType === `买` || dealType === `采购`) { dealType = `采购` }
    else if (dealType === `卖` || dealType === `货源`) { dealType = `货源` }
    else { dealType = `全部` }

    this.setState({
      location: paramsNew.location ? paramsNew.location : `不限`,
      dealType: dealType ? dealType : `全部`,
      prepare_time : paramsNew.prepare_time ? paramsNew.prepare_time : ``,
      product_origin: paramsNew.product_origin ? paramsNew.product_origin : ``,
      delivery: paramsNew.delivery ? paramsNew.delivery : [],
      skip: paramsNew.skip ? paramsNew.skip : 0,
      product_category: paramsNew.product_category ? paramsNew.product_category : ``,
      product_tags: paramsNew.product_tags ? paramsNew.product_tags : ``,
      product_min_quantity: paramsNew.product_min_quantity ? paramsNew.product_min_quantity : 0,
    }, () => {
      params && this.props.actions.fetchDealIfNeeded({type: `destoryDealList`})
      params && this.props.actions.fetchDealIfNeeded({type: `getDeals`, params:paramsNew})
    })
  }

  render() {
    let { deals, showMore } = this.props.data
    return (
      <div>
        <div style={{height:44}} />
        <Navigator title={this.props.data.title} showBack={false}
                   navBgcolor={`#fff`} backImgColor='write' titleColor='#666'/>
         {this._showModalView()}
         <div style={{height:40}} />
         {this._showDealListView(deals, showMore)}
      </div>
    )
  }

  //筛选的固定条 根据数据显示不用的颜色
  _searchListSelectTabView() {

    let locationColor = (this.state.location === `不限`) ? false : true
    let typeColor = (this.state.dealType === `全部`) ? false : true
    let filterColor = (_.isEmpty(this.state.delivery)) &&
                      (this.state.prepare_time === ``) &&
                      (this.state.product_origin === ``) ? false : true
    let item = this.state.dealType

    if (item === `买` || item === `采购`) { item = `采购` }
    else if (item === `卖` || item === `货源`) { item = `货源` }
    else { item = `全部` }

    return (
      <div className='searchListSelectTabView'>
        <div className='searchListTabButton' onClick={()=>this._openModal(`location`)}
             style={{justifyContent:'flex-start', marginLeft: 15}}>
          <div className='searchListTabLocationImg' />
          { locationColor
            ? <div className='searchListTabTextColor'>{this.state.location.toString()}</div>
            : <div className='searchListTabText'>{this.state.location.toString()}</div> }
        </div>
        <div className='searchListTabButton' onClick={()=>this._openModal(`type`)}>
          <div className='searchListTabTypeImg' />
        { typeColor
          ? <div className='searchListTabTextColor'>{item}</div>
          : <div className='searchListTabText'>{item}</div> }
        </div>
        <div className='searchListTabButton' onClick={()=>this._openModal(`filter`)}
             style={{justifyContent:'flex-end', marginRight:15}}>
         { filterColor
           ? <div className='searchListTabTextColor'>筛选</div>
           : <div className='searchListTabText'>筛选</div> }
          <div className='searchListTabFilterImg' />
        </div>
      </div>
    )
  }

  //展示的筛选条
  _showSelectView(select) {
    if (select === `location`) {
      return (
        <FilterLocation locations={this.props.data.locations}
                        selectLocation={this.state.location}
                        onClick={(location)=>this._selectLocation(location)}
        />
      )
    } else if (select === `type`) {
      return (
        <div className='searchListTypeView'>
        {
          _.map(this.state.dealTypes, (item, index) => {
            if(item === this.state.dealType) {
              return (
                <div className='searchListTypeViewCell' key={item} onClick={()=>this._selectType(item)}>
                  <div className='searchListTypeViewCellSelectText'>{item}</div>
                  <div className='searchListTypeViewCellValue' />
                </div>
              )
            } else {
              return (
                <div className='searchListTypeViewCell' key={item} onClick={()=>this._selectType(item)}>
                  <div className='searchListTypeViewCellText'>{item}</div>
                </div>
              )
            }
          })
        }
        </div>
      )
    } else if (select === `filter`) {
      let filters = this.props.data.filters
      return (
        <div>
          {  _.map(filters, (filterItem, index) => {
              if (filterItem.options.length > 0) {
                if (filterItem.isMultiple) {
                  return (
                    <FilterOfCheckBox title={filterItem.name}
                                      itemArray={filterItem.options} ref={index}
                                      selectItems={this.state[filterItem.searchField]}
                                      key={index + filterItem.name + 'filterOfCheckBox'}
                                      onPress={(item)=>this._selectItem(item, filterItem.searchField)}
                    />
                  )
                } else {
                  return (
                    <FilterOfRadioBox title={filterItem.name}
                                      itemArray={filterItem.options} ref={index}
                                      selectItem={this.state[filterItem.searchField]}
                                      key={index + filterItem.name + 'filterOfRadioBox'}
                                      onPress={(item)=>this._selectItem(item, filterItem.searchField)}
                    />
                  )
                }
              }
            })
          }
          <div className='searchListTabViewDown'>
            <div className='searchListTabViewDownClean'
                 style={{width: window.innerWidth / 3 * 2}}>
              <div onClick={()=>this._resetFilter(filters)}>清除筛选</div>
            </div>
            <div className='searchListTabViewDownFinish'
                 style={{width: window.innerWidth / 3}}
                 onClick={()=>this._finish()}>完成</div>
          </div>
        </div>
      )
    }
  }

  //展示列表
  _showDealListView(deals, showMore) {
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
        { (showMore == true) &&
          <div className='loadingMore' onClick={()=>this._loadMore(deals.length)}>加载更多</div> }
        </div>
      )
    } else if (deals.length == 0) {
      if (this.props.data.nodeal == true) {
        return (
          <div className='center' style={{height: window.innerHeight - 84}}>
            未搜索到产品
          </div>
        )
      } else if (this.props.data.loading == true) {
        return (
          <div className='center' style={{height: window.innerHeight- 84}}>
            <Loading />
          </div>
        )
      }
    }
  }

  //调用显示弹出层
  _showModalView() {
    return (
      <div>
        {this._searchListSelectTabView()}
        <Modal
          style={customStyles}
          contentLabel='modal'
          isOpen={this.state.modalIsOpen}
          onRequestClose={()=>this.closeModal()} >
          {this._showSelectView(this.state.select)}
        </Modal>
      </div>
    )
  }

  //打开弹出筛选的弹出层
  _openModal(select) {
    if (select !== this.state.select) {
      this.setState({modalIsOpen: true, select: select})
    } else {
      this.setState({modalIsOpen: !this.state.modalIsOpen})
    }
  }

  //关闭弹出层
  closeModal() {
    this.setState({
      modalIsOpen: false
    })
  }

  //deal 的点击事件
  _clickDeal(e, item) {
    this.props.actions.fetchDealIfNeeded({type: `saveDealDetail`, dealDetail: item})
  }

  //加载更多func
  _loadMore(skip) {
    let state = this.props.location.state
    let param = state ? state.data.params : false
    let title =this.props.data.title
    let params = Object.assign({}, param, this.state, {skip: skip, title: title})
    this.props.actions.fetchDealIfNeeded({type: `loadingMore`, params: params})
  }

  //地区筛选
  _selectLocation(location) {
    let string = this.props.location.search
    let type = string.substring(string.indexOf('?') + 1, string.indexOf(':'))
    if (type === `location`) {
      this.setState({
        title: location,
        location: location,
        modalIsOpen: false
      },() => {
        let params = this.state
        this.props.actions.fetchDealIfNeeded({type: `saveParams`, params: params})
        this.props.actions.fetchDealIfNeeded({type: `destoryDealList`})
        this.props.actions.fetchDealIfNeeded({type: `getDeals`, params:params})
        this.props.actions.fetchDealIfNeeded({type: `saveTitle`, title: location})
      })
    } else {
      this.setState({
        location: location,
        modalIsOpen: false
      },() => {
        let params = this.state
        this.props.actions.fetchDealIfNeeded({type: `saveParams`, params: params})
        this.props.actions.fetchDealIfNeeded({type: `destoryDealList`})
        this.props.actions.fetchDealIfNeeded({type: `getDeals`, params:params})
      })
    }
  }

  //种类筛选
  _selectType(type) {
    this.setState({
      dealType: type,
      modalIsOpen: false
    },() => {
      let params = this.state
      this.props.actions.fetchDealIfNeeded({type: `saveParams`, params: params})
      this.props.actions.fetchDealIfNeeded({type: `destoryDealList`})
      this.props.actions.fetchDealIfNeeded({type: `getDeals`, params:params})
    })
  }

  //基本筛选
  _selectItem(item, searchField) {
    this.setState({
      [searchField]: item
    },() => {
      // console.log(this.state);
    })
  }

  //基本筛选中清空
  _resetFilter(filters) {
    this.setState({
      delivery: [],
      prepare_time: '',
      product_origin: ''
    })
    for (var i = 0; i < filters.length; i++) {
      this.refs[i].resetFunc()
    }
  }

  //点击完成
  _finish() {
    this.setState({
      modalIsOpen: false
    },() => {
      let params = this.state
      this.props.actions.fetchDealIfNeeded({type: `saveParams`, params: params})
      this.props.actions.fetchDealIfNeeded({type: `destoryDealList`})
      this.props.actions.fetchDealIfNeeded({type: `getDeals`, params:params})
    })
  }

}

export default connect(state => ({
  data: state.DealReducer
  }),
  (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(DealList)
