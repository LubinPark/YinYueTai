import React, { Component } from 'react'
import { Route, Router } from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'

import App from '../containers/app'
import SearchList from '../components/search/searchList'
import DealList from '../components/dealList/dealList'
import DetailDeal from '../components/detailDeal/detailDeal'
import UserPage from '../components/user/userPage'
import styles from '../css/common/error.css'

const history = createBrowserHistory()

class Root extends Component {
  render() {
    return (
      <Router history={history}>
        <div>
          <Route exact path="/" component={App} />
          <Route path="/search" component={SearchList} />
          <Route path="/dealList" component={DealList} />
          <Route path="/detailDeal" component={DetailDeal} />
          <Route path="/user" component={UserPage} />
        </div>
      </Router>
    )
  }
}

export default Root
