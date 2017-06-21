import _ from 'underscore'
import React, { Component } from 'react'
import styles from '../../css/search/searchTab.css'

class SearchTab extends Component {

  render() {

    let searchText = this.props.searchText ? this.props.searchText : ``

    return (
      <div className='searchTabInputView'>
        <input className='searchTabInput'
               type='text'
               style={{width: window.innerWidth - 80}}
               placeholder='search'
               value={this.props.searchText}
               onChange={(e)=>this._onChange(e)}/>
        <div className='searchTabText' onClick={()=>{this._onSearch()}}>搜索</div>
      </div>
    )
  }

  //文本框内容变化
  _onChange(e) {
    let value = e.target.value
    this.setState({
      searchText: value
    },() => {
      this.props.onChange && this.props.onChange(value)
    })
  }

  //点击搜索
  _onSearch() {
    let searchText = this.props.searchText
    if(!_.isEmpty(searchText)) {
      this.props.onSearch && this.props.onSearch(searchText)
    }
  }

}

export default SearchTab
