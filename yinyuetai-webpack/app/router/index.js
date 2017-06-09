import React, { Component } from 'react'
import { Route, HashRouter } from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'

import App from '../containers/app'
import DetailDeal from '../components/detailDeal/detailDeal'
import UserPage from '../components/user/userPage'
import styles from '../css/common/error.css'

const history = createBrowserHistory()

class Root extends Component {
  render() {
    return (
      <HashRouter history={history}>
        <div>
          <Route exact path="/" component={App} />
          <Route path="/react" component={App} />
          <Route path="/detailDeal" component={DetailDeal} />
          <Route path="/user" component={UserPage} />
        </div>
      </HashRouter>
    )
  }
}

export default Root
