import { h, Component } from 'preact'
import { Router, route } from 'preact-router'
import { connect } from 'unistore/preact'

import { actions } from '../store'

import { changeBackground } from '../lib/background'

import Header from '../components/header'
import Footer from '../components/footer'

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
        <Header />
        <Router onChange={this.props.navigate}>
          <Home path='/' {...this.props} />
          <LocalGame path='/local/:player/:mode' {...this.props} />
          <HostGame path='/host' />
          <RemoteGame path='/remote' />
          {/* <GameStats path='/stats' /> */}
        </Router>
        <Footer />
      </div>
    )
  }
}

export default connect('lastUri,lastPlayerChoice,lastModeChoice,games', actions)(App)
