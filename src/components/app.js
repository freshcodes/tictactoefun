import { h, Component } from 'preact'
import { Router, route } from 'preact-router'
import { connect } from 'unistore/preact'

import { actions } from '../store'

// Code-splitting is automated for routes
import Home from '../routes/home'
import LocalGame from '../routes/local_game'
import RemoteGame from '../routes/remote_game'

class App extends Component {
  componentDidMount () {
    let currentPath = window.location.pathname
    let lastPath = this.props.lastUri
    if (lastPath && currentPath === '/' && lastPath !== currentPath) route(lastPath)
  }

  render () {
    return (
      <div id='app'>
        <Router onChange={this.props.navigate}>
          <Home path='/' />
          <LocalGame path='/local/:player/:mode' {...this.props} />
          <RemoteGame path='/remote/:room' />
        </Router>
      </div>
    )
  }
}

export default connect('lastUri,games', actions)(App)
