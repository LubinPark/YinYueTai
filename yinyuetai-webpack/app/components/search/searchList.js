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
    bottom                  : '150px',
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
      selectLocation: `悉尼`
    }
  }

  componentDidMount() {
    this.props.actions.fetchSearchListIfNeeded({type: `getLocations`})
  }

  render() {
    let data = this.props.data
    let locations = data.locations

    if (locations.length > 0) {
      return (
        <div className='searchListView'>
          <SearchTab />
          <div style={{marginTop:44}} />
          {this._searchListSelectTabView()}
          <Modal
            style={customStyles}
            isOpen={this.state.modalIsOpen}
            onRequestClose={()=>this.closeModal()}
            contentLabel="Modal">
            {this._showSelectView(this.state.select)}
          </Modal>
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
    return (
      <div className='searchListSelectTabView'>
        <div className='searchListTabButton' onClick={()=>this._openModal(`location`)}
             style={{justifyContent:'flex-start', marginLeft: 15}}>
          <div className='searchListTabLocationImg' />
          <div className='searchListTabText'>不限</div>
        </div>
        <div className='searchListTabButton' onClick={()=>this._openModal(`type`)}>
          <div className='searchListTabTypeImg' />
          <div className='searchListTabText'>全部</div>
        </div>
        <div className='searchListTabButton' onClick={()=>this._openModal(`filter`)}
             style={{justifyContent:'flex-end', marginRight:15}}>
          <div className='searchListTabText'>筛选</div>
          <div className='searchListTabFilterImg' />
        </div>
      </div>
    )
  }

  _showSelectView(select) {

    if (select === `location`) {
      return (
        <FilterLocation locations={this.props.data.locations} selectLocation={this.state.selectLocation}/>
      )
    } else if (select === `type`) {
      return (
        <div className='searchListTypeView'>
        {
          _.map(this.state.dealType, (item, index) => {
            return (
              <div className='searchListTypeViewCell' key={item} onClick={()=>this._selectType(item)}>
                <div className='searchListTypeViewCellText'>{item}</div>
                { (item === this.state.selectDealType) &&
                  <div className='searchListTypeViewCellValue' /> }
              </div>
            )
          })
        }
        </div>
      )
    } else if (select === `filter`) {
      return (
        <div />
      )
    }
  }

  _selectType(type) {
    this.setState({
      selectDealType: type
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
