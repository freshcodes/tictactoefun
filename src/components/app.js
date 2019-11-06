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
        <header><h1>TicTacToe.Fun</h1></header>
        <Router onChange={this.props.navigate}>
          <Home path='/' />
          <LocalGame path='/local/:player/:mode' {...this.props} />
          <RemoteGame path='/host' />
          <RemoteGame path='/remote/:hostId' />
        </Router>
        <footer>
          <p><a href='https://fresh.codes'><img src="/assets/fresh-codes.svg" alt="Fresh Codes" width="200" /></a></p>
        </footer>
      </div>
    )
  }
}

export default connect('lastUri,games', actions)(App)
