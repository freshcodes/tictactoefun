import { h, Component } from 'preact'
import { Router, route } from 'preact-router'
import { connect } from 'unistore/preact'

import { actions } from '../store'

import { changeBackground } from '../lib/background'

// Code-splitting is automated for routes
import Home from '../routes/home'
import LocalGame from '../routes/local_game'
import HostGame from '../routes/host_game'
import RemoteGame from '../routes/remote_game'
// import GameStats from '../routes/game_stats'

class App extends Component {
  componentDidMount () {
    changeBackground()

    let currentPath = window.location.pathname
    let lastPath = this.props.lastUri
    if (lastPath && currentPath === '/' && lastPath !== currentPath) route(lastPath)
  }

  render () {
    return (
      <div id='app'>
        <header><h1>TicTacToe.Fun</h1></header>
        <Router onChange={this.props.navigate}>
          <Home path='/' {...this.props} />
          <LocalGame path='/local/:player/:mode' {...this.props} />
          <HostGame path='/host' />
          <RemoteGame path='/remote' />
          {/* <GameStats path='/stats' /> */}
        </Router>
        <footer>
          <p><a href='https://fresh.codes'><img src="/assets/fresh-codes.svg" alt="Fresh Codes" width="200" /></a></p>
        </footer>
      </div>
    )
  }
}

export default connect('lastUri,games', actions)(App)
