import React, { Component } from 'react'
import { BrowserRouter as Router, Route, HashRouter } from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'

import App from '../containers/app'
import DetailDeal from '../components/detailDeal/detailDeal'
import UserPage from '../components/user/userPage'

const history = createBrowserHistory()

class Root extends Component {
  render() {
    return (
      <Router history={history}>
        <div>
          <Route exact path="/" component={App} />
          <Route path="/react" component={App} />
          <Route exact path="/detailDeal" component={DetailDeal} />
          <Route exact path="/user" component={UserPage} />
        </div>
      </Router>
    )
  }
}

export default Root
