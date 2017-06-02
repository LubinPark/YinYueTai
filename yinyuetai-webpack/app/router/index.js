import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import App from '../containers/app'
import DetailDeal from '../components/detailDeal/detailDeal'

class Root extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={App}/>
          <Route path="/detailDeal" component={DetailDeal}/>
        </div>
      </Router>
    )
  }
}

export default Root
