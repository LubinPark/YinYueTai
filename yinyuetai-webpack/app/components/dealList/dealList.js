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
      delivery: [],
      prepare_time: ``,
      product_origin: ``
    }
  }

  componentDidMount() {
    let state = this.props.location.state ? this.props.location.state : false
    state && this.props.actions.fetchDealIfNeeded({type: `deleteParams`})

    let param = this.props.data.params
    let showLocation
    let dealType = ((param.dealType === `采购`) || (param.dealType === `买`)) ? `采购` : ((param.dealType === `货源`) || (param.dealType === `卖`)) ? `货源` : `全部`

    state && this.props.actions.fetchDealIfNeeded({type: `getLocations`})
    state && this.props.actions.fetchDealIfNeeded({type: `saveTitle`, title: state.data.name})
    state && this.props.actions.fetchDealIfNeeded({type: `saveFilters`, filters: state.data.filters})
    state && this._beforeLoading(state)

    if (state.type === `location`) {
      showLocation = state.data.name
    } else {
      showLocation = state.data ? state.data.params.location: `不限`
    }

    //state 不存在使用reducer里的params
    !state && this.setState({
      location: showLocation,
      dealType: dealType,
      prepare_time : param.prepare_time ? param.prepare_time : ``,
      product_origin: param.product_origin ? param.product_origin : ``,
      delivery: param.delivery ? param.delivery : [],
      skip: param.skip ? param.skip : 0,
      product_category: param.product_category ? param.product_category : ``,
      product_tags: param.product_tags ? param.product_tags : [],
      product_min_quantity: param.product_min_quantity ? param.product_min_quantity: 0,
    },() => {
      let dealType = ((param.dealType === `采购`) || (param.dealType === `买`)) ? `买` : ((param.dealType === `货源`) || (param.dealType === `卖`)) ? `卖` : `全部`
      let paramsNew = Object.assign({}, this.state, state.data ? state.data.params : {}, {dealType:dealType})
      state && this.props.actions.fetchDealIfNeeded({type: `saveParams`, params: paramsNew })
      state && this.props.actions.fetchDealIfNeeded({type: `getDeals`, params: paramsNew})
    })
    //state存在直接使用
    this.setState({
      location: showLocation
    }, () => {
      let paramsNew = Object.assign({}, this.state, state.data ? state.data.params : {}, {dealType:`全部`})
      state && this.props.actions.fetchDealIfNeeded({type: `saveParams`, params: paramsNew })
      state && this.props.actions.fetchDealIfNeeded({type: `getDeals`, params: paramsNew})
    })

  }

  //请求加载之前操作，删除list 的数据
  _beforeLoading(state) {
    let { type, data } = state
    this.setState({title: data.name})
    this.props.actions.fetchDealIfNeeded({type: `destoryDealList`})
  }

  render() {
    let { deals, showMore, title, filters } = this.props.data
    return (
      <div>
        <div style={{height:44}} />
        <Navigator title={title} showBack={false}
                   navBgcolor={`#fff`} backImgColor='write' titleColor='#666'/>
         {this._showModalView(filters)}
         <div style={{height:40}} />
         {this._showDealListView(deals, showMore)}
      </div>
    )
  }

  //筛选的固定条 根据数据显示不用的颜色
  _searchListSelectTabView(filters) {

    let showDealType
    let dealType = this.state.dealType
    let locationColor = (this.state.location === `不限`) ? false : true
    let typeColor = (this.state.dealType === `全部`) ? false : true
    let filterColor = false

    if (!_.isEmpty(filters)) {
      for (var i = 0; i < filters.length; i++) {
        let searchField = filters[i].searchField
        if (!_.isEmpty(this.state[searchField])) {
          filterColor = true
        }
      }
    }

    if (dealType === `买` || dealType === `采购`) { showDealType = `采购` }
    else if (dealType === `卖` || dealType === `货源`) { showDealType = `货源` }
    else { showDealType = `全部` }

    return (
      <div className='searchListSelectTabView'>
        <div className='searchListTabButton' onClick={()=>this._openModal(`location`)}
             style={{justifyContent:'flex-start', marginLeft: 15}}>
          <div className='searchListTabLocationImg' />
          { locationColor
            ? <div className='searchListTabTextColor'>{this.state.location}</div>
            : <div className='searchListTabText'>{this.state.location}</div> }
        </div>
        <div className='searchListTabButton' onClick={()=>this._openModal(`type`)}>
          <div className='searchListTabTypeImg' />
        { typeColor
          ? <div className='searchListTabTextColor'>{showDealType}</div>
          : <div className='searchListTabText'>{showDealType}</div> }
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
                <div className='searchListTypeViewCell' key={item+`select`} onClick={()=>this._selectType(item)}>
                  <div className='searchListTypeViewCellSelectText'>{item}</div>
                  <div className='searchListTypeViewCellValue' />
                </div>
              )
            } else {
              return (
                <div className='searchListTypeViewCell' key={item+`noSelect`} onClick={()=>this._selectType(item)}>
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
                                      onPress={(item)=>this._selectItem(item,filterItem.searchField)}
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
  _showModalView(filters) {
    return (
      <div>
        {this._searchListSelectTabView(filters)}
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
    let params = Object.assign({}, this.props.data.params, {skip: skip, dealType: this.state.dealType})
    this.props.actions.fetchDealIfNeeded({type: `saveParams`, params: params})
    this.props.actions.fetchDealIfNeeded({type: `getDeals`, params: params})
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
        let paramsNew = Object.assign({}, this.props.data.params, params)
        this.props.actions.fetchDealIfNeeded({type: `saveParams`, params: paramsNew})
        this.props.actions.fetchDealIfNeeded({type: `saveTitle`, title: location})
        this.props.actions.fetchDealIfNeeded({type: `destoryDealList`})
        this.props.actions.fetchDealIfNeeded({type: `getDeals`, params: paramsNew})
      })
    } else {
      this.setState({
        location: location,
        modalIsOpen: false
      },() => {
        let params = this.state
        let paramsNew = Object.assign({}, this.props.data.params, params)
        this.props.actions.fetchDealIfNeeded({type: `saveParams`, params: paramsNew})
        this.props.actions.fetchDealIfNeeded({type: `destoryDealList`})
        this.props.actions.fetchDealIfNeeded({type: `getDeals`, params: paramsNew})
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
      let paramsNew = Object.assign({}, this.props.data.params, params)
      this.props.actions.fetchDealIfNeeded({type: `saveParams`, params: paramsNew})
      this.props.actions.fetchDealIfNeeded({type: `destoryDealList`})
      this.props.actions.fetchDealIfNeeded({type: `getDeals`, params:paramsNew})
    })
  }

  //基本筛选
  _selectItem(item, searchField) {
    this.setState({
      [searchField]: item
    })
  }

  //基本筛选中清空
  _resetFilter(filters) {
    _.map(filters, (item, index) => {
      if (item.searchField === `prepare_time`) {
        this.setState({ prepare_time: `` })
      } else if (item.searchField === `product_origin`) {
        this.setState({ product_origin: `` })
      } else if (item.searchField === `delivery`) {
        this.setState({ delivery: [] })
      }
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
      let paramsNew = Object.assign({}, this.props.data.params, params)
      this.props.actions.fetchDealIfNeeded({type: `saveParams`, params: paramsNew})
      this.props.actions.fetchDealIfNeeded({type: `destoryDealList`})
      this.props.actions.fetchDealIfNeeded({type: `getDeals`, params: paramsNew})
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
