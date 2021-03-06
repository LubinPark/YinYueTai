import _ from 'underscore'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'

import * as actions from '../../actions/searchAction'

import styles from '../../css/search/searchList.css'
import SearchTab from './searchTab'
import Loading from '../common/loading'
import Navigator from '../common/navigator'
import DealCell from '../dealList/dealCell'
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

class SearchList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      modalIsOpen: false,
      select: ``,
      dealTypes: [`全部`,`采购`,`货源`],

      dealType: `全部`,
      location: `不限`,
      prepare_time : ``,
      product_origin: ``,
      delivery: [],
      searchText: ``,
      skip: 0,
      page: ``
    }
  }

  componentDidMount() {
    //根据进入的页面不同保存不同的searchText
    let page = this.props.location.state ? this.props.location.state.page : `other`
    if (page === `home`) {
      let searchText = ``
      this._setSearchText(page, searchText)
    } else {
      let searchText = this.props.data.searchText
      this._setSearchText(page, searchText)
    }

    //当返回到当前的页面数据reducer调用 设置params
    let paramsNew = this.props.data.params
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
      skip: paramsNew.skip ? paramsNew.skip : 0
    }, () => {
      this.props.actions.fetchSearchListIfNeeded({type: `saveParams`, params: this.state})
      this.props.actions.fetchSearchListIfNeeded({type: `getLocations`})
      this.props.actions.fetchSearchListIfNeeded({type: `getDefaultFilters`})
      this.props.actions.fetchSearchListIfNeeded({type: `getHotSearches`})
    })
  }

  //从主页到searchListView 前清空search ，其他页面返回searchListView 使用reducer中的值
  _setSearchText(page, searchText) {
    this.setState({
      page: page,
      searchText: searchText
    }, ()=> {
      this.props.actions.fetchSearchListIfNeeded({type: `saveSearchText`, searchText: searchText})
    })
  }

  render() {

    let { searchText, searches, searchHistoryArray, locations, filters, deals, error, showMore } = this.props.data

    if(searchText.length === 0) {
      if (searches.length > 0) {
        return (
          <div className='searchListView'>
            <SearchTab
              searchText={searchText}
              onChange={(value)=>this._onChange(value)}
              onSearch={(value)=>this._onSearch(value)}
            />
            <div style={{marginTop:44}} />
            {this._showHotSearchView(searches)}
            {(searchHistoryArray.length > 0) && this._showHistoryView(searchHistoryArray)}
          </div>
        )
      } else {
        if (error) {
          <div className='searchListView'>
            <SearchTab
              searchText={searchText}
              onChange={(value)=>this._onChange(value)}
              onSearch={(value)=>this._onSearch(value)}
            />
            <div>网络错误，请重新链接</div>
          </div>
        } else {
          return (
            <div className='center' style={{height: window.innerHeight}}>
              <Loading />
            </div>
          )
        }
      }
    } else {
      if (locations.length > 0) {
        return (
          <div className='searchListView'>
            <SearchTab
              searchText={searchText}
              onChange={(value)=>this._onChange(value)}
              onSearch={(value)=>this._onSearch(value)}
            />
          <div style={{marginTop:44}} />
          {this._showModalView()}
          {this._showSearchList(deals, showMore)}
          </div>
        )
      } else {
        return (
          <div className='searchListView'>
            <SearchTab
              searchText={searchText}
              onChange={(value)=>this._onChange(value)}
              onSearch={(value)=>this._onSearch(value)}
            />
            <div>网络错误，请重新链接</div>
          </div>
        )
      }
    }
  }

  //调用显示热门搜索
  _showHotSearchView(searches) {
    return (
      <div className='searchListViewHotSearch'>
        <div className='searchListViewHotSearchTitle'>热门搜索</div>
        <div className='searchListViewHotSearchView'>
        {
          _.map(searches, (item, index) => {
            return (
              <div className='searchListViewHotSearchItem' key={item+`HotSearch`+index}
                    onClick={()=>this._selectHotSearchItem(item)}>
              {item}
              </div>
            )
          })
        }
        </div>
      </div>
    )
  }

  //调用显示历史记录
  _showHistoryView(searchHistoryArray) {
    return (
      <div className='searchListViewHistory'>
        <div className='searchListViewHotSearchTitleView'>
          <div className='searchListViewHistoryTitle'>历史记录</div>
          <div className='searchListViewHistoryDelete' onClick={()=>this._deleteHistory()}>清空</div>
        </div>
        <div className='searchListViewHotSearchView'>
        {
          _.map(searchHistoryArray, (item, index) => {
            return (
              <div className='searchListViewHotSearchItem' key={item+`History`+index}
                   onClick={()=>this._selectHotSearchItem(item)}>
              {item}
              </div>
            )
          })
        }
        </div>
      </div>
    )
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
            ? <div className='searchListTabTextColor'>{this.state.location}</div>
            : <div className='searchListTabText'>{this.state.location}</div> }
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
            if(this.state.dealType === item) {
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


  //deals展示list 列表
  _showSearchList(deals, showMore) {
    if (!!deals && (deals.length > 0)) {
      return (
        <div style={{backgroundColor:'#fff', paddingTop: 40}}>
          {
            _.map(deals, (item, index) => {
              let url = `/detailDeal?dealId:` + item.id
              return (
                <Link to={url} key={index} style={{textDecoration: `blink`}}>
                  <DealCell key={item.id+'searchList'} deal={item} onClick={(e)=>this._clickDeal(e, item)} />
                </Link>
              )
            })
          }
          {
            (showMore == true) &&
            <div className='loadingMore' onClick={()=>this._loadMore(deals.length)}>
              加载更多
            </div>
          }

        </div>
      )
    } else if (this.props.data.loading) {
      return (
        <div className='center' style={{height: window.innerHeight, backgroundColor:'#FFF'}}>
          <Loading />
        </div>
      )
    } else {
      return (
        <div className='noDealView' style={{height: window.innerHeight - 84}}>
          未搜索到产品
        </div>
      )
    }
  }

  //文本框变化保存state
  _onChange(value) {
    if (_.isEmpty(value)) {
      this.setState({
        searchText: ``,
        location: `不限`,
        dealType: `全部`,
        delivery: [],
        prepare_time: '',
        product_origin: ''
      },() => {
        this.props.actions.fetchSearchListIfNeeded({type: `saveSearchText`, searchText: value})
        this.props.actions.fetchSearchListIfNeeded({type: `saveParams`, params: this.state})
      })
    } else {
      this.setState({
        searchText: value
      },() => {
        this.props.actions.fetchSearchListIfNeeded({type: `saveSearchText`, searchText: value})
      })
    }
  }

  _clickDeal() {}

  //点击 搜索 获取文本框value 请求deals
  _onSearch(value) {
    this.props.actions.fetchSearchListIfNeeded({type: `destorySearchList`})
    this.props.actions.fetchSearchListIfNeeded({type: `saveHistorySearchText`, searchText: value})
    let params = this.state
    let newParams = Object.assign({}, params, {searchText: value})
    this.props.actions.fetchSearchListIfNeeded({type: `getSearchDeals`, params:params})
  }

  //历史搜索 清空
  _deleteHistory() {
    this.props.actions.fetchSearchListIfNeeded({type: `deleteHistory`})
  }

  //点击热门搜索，或者历史搜索的 item
  _selectHotSearchItem(value) {
    this.props.actions.fetchSearchListIfNeeded({type: `saveHistorySearchText`, searchText: value})
    this.setState({
      searchText: value,
      location: `不限`,
      dealType: `全部`,
      delivery: [],
      prepare_time: '',
      product_origin: ''
    },() => {
      this.props.actions.fetchSearchListIfNeeded({type: `saveSearchText`, searchText: value})
      this.props.actions.fetchSearchListIfNeeded({type: `destorySearchList`})
      let params = this.state
      this.props.actions.fetchSearchListIfNeeded({type: `getSearchDeals`, params:params})
    })
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

  //地区筛选
  _selectLocation(location) {
    this.setState({
      location: location,
      modalIsOpen: false
    },() => {
      let params = this.state
      this.props.actions.fetchSearchListIfNeeded({type: `destorySearchList`})
      this.props.actions.fetchSearchListIfNeeded({type: `saveParams`, params: params})
      this.props.actions.fetchSearchListIfNeeded({type: `getSearchDeals`, params:params})
    })
  }

  //种类筛选
  _selectType(type) {
    this.setState({
      dealType: type,
      modalIsOpen: false
    },() => {
      let params = this.state
      this.props.actions.fetchSearchListIfNeeded({type: `destorySearchList`})
      this.props.actions.fetchSearchListIfNeeded({type: `saveParams`, params: params})
      this.props.actions.fetchSearchListIfNeeded({type: `getSearchDeals`, params:params})
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
      this.props.actions.fetchSearchListIfNeeded({type: `destorySearchList`})
      this.props.actions.fetchSearchListIfNeeded({type: `saveParams`, params: params})
      this.props.actions.fetchSearchListIfNeeded({type: `getSearchDeals`, params:params})
    })
  }

  _loadMore(skip) {
    let state = this.state
    let params = Object.assign({}, state, {skip: skip})
    this.props.actions.fetchSearchListIfNeeded({type: `loadingMore`, params: params })
  }
}

export default connect(state => ({
  data: state.SearchReducer
  }),
  (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(SearchList)
