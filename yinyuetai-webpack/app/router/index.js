import React, {Component} from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import App from '../containers/app'

class Root extends Component{
  render() {
    return (
      <Router>
        <Route exact path="/" component={App}/>
      </Router>
    )
  }
}

export default Root
