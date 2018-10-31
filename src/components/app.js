import { h, Component } from 'preact'
import { Router } from 'preact-router'

// Code-splitting is automated for routes
import Home from '../routes/home'
import LocalGame from '../routes/local_game'
import RemoteGame from '../routes/remote_game'

export default class App extends Component {
  handleRoute = (event) => {
    if (typeof window === 'undefined') return
    if (window.ga) window.ga('send', 'pageview', event.url)
  }

  render () {
    return (
      <div id='app'>
        <Router onChange={this.handleRoute}>
          <Home path='/' />
          <LocalGame path='/local/:player/:mode' />
          <RemoteGame path='/remote/:room' />
        </Router>
      </div>
    )
  }
}
