import _ from 'underscore'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'

import * as actions from '../../actions/searchAction'

import SearchTab from './searchTab'
import Loading from '../common/loading'
import Navigator from '../common/navigator'
import DealCell from '../dealList/dealCell'
import FilterLocation from '../common/filterLocation'
import FilterOfCheckBox from '../common/filterOfCheckBox'
import FilterOfRadioBox from '../common/filterOfRadioBox'
import styles from '../../css/search/searchList.css'

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
    height                  : '409px',
    padding                 : '0px',
    borderRadius            : '0px',
    background              : '#fff',
    overflow                : 'auto',
    WebkitOverflowScrolling : 'touch',
    outline                 : 'none',
    borderTop               : '1px solid #ededed'
  }
}

class SearchList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      modalIsOpen: false,
      select: ``,
      dealType: [`全部`,`采购`,`货源`],
      selectDealType: `全部`,
      selectLocation: `不限`,
      prepare_time : ``,
      product_origin: ``,
      delivery: [],
      searchText: ``
    }
  }

  componentDidMount() {
    this.props.actions.fetchSearchListIfNeeded({type: `getLocations`})
    this.props.actions.fetchSearchListIfNeeded({type: `getDefaultFilters`})
    this.props.actions.fetchSearchListIfNeeded({type: `getHotSearches`})
  }

  render() {

    let searchText = this.state.searchText
    let data = this.props.data
    let locations = data.locations
    let filters = data.filters
    let searches = data.searches

    if (locations.length > 0 && filters.length > 0) {
      return (
        <div className='searchListView'>
          <SearchTab onChange={(value)=>this._onChange(value)} searchText={this.state.searchText}/>
          <div style={{marginTop:44}} />
          {
            (searchText.length == 0) &&
            <div className='searchListViewHotSearch'>
              <div className='searchListViewHotSearchTitle'>热门搜索</div>
              <div className='searchListViewHotSearchView'>
              {
                _.map(searches, (item, index) => {
                  return (
                    <div className='searchListViewHotSearchItem' key={item}
                          onClick={()=>this._selectHotSearchItem(item)}>
                    {item}
                    </div>
                  )
                })
              }
              </div>
            </div>
          }
          {
            (searchText.length == 0) &&
            <div className='searchListViewHotSearch' style={{marginTop: 10}}>
              <div className='searchListViewHotSearchTitleView'>
                <div className='searchListViewHotSearchTitle2'>历史记录</div>
                <div className='searchListViewHotSearchDelete'>清空</div>
              </div>
              <div className='searchListViewHotSearchView'>
              {
                _.map(searches, (item, index) => {
                  return (
                    <div className='searchListViewHotSearchItem' key={item}
                         onClick={()=>this._selectHotSearchItem(item)}>
                    {item}
                    </div>
                  )
                })
              }
              </div>
            </div>
          }
          {
          (searchText.length > 0) &&
            <div>
              {this._searchListSelectTabView()}
              <Modal
                style={customStyles}
                isOpen={this.state.modalIsOpen}
                onRequestClose={()=>this.closeModal()}
                contentLabel="Modal">
                {this._showSelectView(this.state.select)}
              </Modal>
            </div>
          }
          { data.deals.length &&
            this.state.searchText.length &&
            this._showSearchList(data.deals) }
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

  _showSearchList(deals) {
    return (
      <div style={{backgroundColor:'#fff', paddingTop: 40}}>
        {
          _.map(deals, (item, index) => {
            let url = `/detailDeal?dealId:` + item.id
            return (
              <Link to={url} key={index} style={{textDecoration: `blink`}}>
                <DealCell key={item.id+'searchList'} deal={item} onClick={(e)=>this._clickDeal(e, item)}/>
              </Link>
            )
          })
        }
      </div>
    )
  }

  _clickDeal() {

  }

  _onChange(value) {
    this.setState({
      searchText: value
    })
  }

  _selectHotSearchItem(value) {
    this.setState({
      searchText: value
    },() => {
      let params = this.state
      this.props.actions.fetchSearchListIfNeeded({type: `getSearchDeals`,params:params})
    })
  }

  _openModal(select) {
    if (select !== this.state.select) {
      this.setState({modalIsOpen: true, select: select})
    } else {
      this.setState({modalIsOpen: !this.state.modalIsOpen})
    }
  }

  closeModal() {
    this.setState({modalIsOpen: false})
  }

  _searchListSelectTabView() {

    let locationColor = (this.state.selectLocation === `不限`) ? false : true
    let typeColor = (this.state.selectDealType === `全部`) ? false : true
    let filterColor = (_.isEmpty(this.state.delivery)) &&
                      (this.state.prepare_time === ``) &&
                      (this.state.product_origin === ``) ? false : true

    return (
      <div className='searchListSelectTabView'>
        <div className='searchListTabButton' onClick={()=>this._openModal(`location`)}
             style={{justifyContent:'flex-start', marginLeft: 15}}>
          <div className='searchListTabLocationImg' />
          { locationColor
            ? <div className='searchListTabTextColor'>{this.state.selectLocation}</div>
            : <div className='searchListTabText'>{this.state.selectLocation}</div> }
        </div>
        <div className='searchListTabButton' onClick={()=>this._openModal(`type`)}>
          <div className='searchListTabTypeImg' />
        { typeColor
          ? <div className='searchListTabTextColor'>{this.state.selectDealType}</div>
          : <div className='searchListTabText'>{this.state.selectDealType}</div> }
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

  _showSelectView(select) {
    if (select === `location`) {
      return (
        <FilterLocation locations={this.props.data.locations}
                        selectLocation={this.state.selectLocation}
                        onClick={(location)=>this._selectLocation(location)}
        />
      )
    } else if (select === `type`) {
      return (
        <div className='searchListTypeView'>
        {
          _.map(this.state.dealType, (item, index) => {
            if(item === this.state.selectDealType) {
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
            <div className='searchListTabViewDownClean' style={{width: window.innerWidth / 3 * 2}}>清除筛选</div>
            <div className='searchListTabViewDownFinish'
                 style={{width: window.innerWidth / 3}}
                 onClick={()=>this._finish()}>完成</div>
          </div>
        </div>
      )
    }
  }

  _selectLocation(location) {
    this.setState({
      selectLocation: location,
      modalIsOpen: false
    },() => {
      let params = this.state
      this.props.actions.fetchSearchListIfNeeded({type: `getSearchDeals`,params:params})
    })
  }

  _selectType(type) {
    this.setState({
      selectDealType: type,
      modalIsOpen: false
    },() => {
      let params = this.state
      this.props.actions.fetchSearchListIfNeeded({type: `getSearchDeals`,params:params})
    })

  }

  _selectItem(item, searchField) {
    this.setState({
      [searchField]: item
    },() => {
      // console.log(this.state);
    })
  }

  _finish() {
    this.setState({
      modalIsOpen: false
    },() => {
      let params = this.state
      this.props.actions.fetchSearchListIfNeeded({type: `getSearchDeals`,params:params})
    })
  }

}

export default connect(state => ({
  data: state.SearchReducer,
  }),
  (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(SearchList)
