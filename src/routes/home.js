import { h, Component } from 'preact'
import { route } from 'preact-router'

import { playerNamesMap, modeNamesMap } from '../store'

import PlayerChoice from '../components/player_choice'
import ModeChoice from '../components/mode_choice'

export default class Home extends Component {
  componentDidMount () {
    let currentPath = window.location.pathname
    let lastPath = this.props.lastUri
    if (lastPath !== currentPath) {
      route(lastPath)
    }
  }

  startLocalGame = (event) => {
    let player = this.props.lastPlayerChoice
    let mode = this.props.lastModeChoice

    let playerForUrl = playerNamesMap[player].toLowerCase()
    let modeForUrl = modeNamesMap[mode].toLowerCase()

    this.props.clearGameStateFromParams(player, mode)

    route(`/local/${playerForUrl}/${modeForUrl}`)
  }

  startRemoteGame = (event) => {
    route('/host')
  }

  render () {
    return (
      <main>
        <div class='title-screen-local-game'>
          <p>Play against the computer.</p>
          <PlayerChoice />
          <ModeChoice />
          <p><button onclick={this.startLocalGame}>Play</button></p>
        </div>
        <div class='title-screen-remote-game'>
          <p>You can also play against a friend.</p>
          <p><button onclick={this.startRemoteGame}>Start Remote Game</button></p>
        </div>
        <p>Check out your <a href='/stats'>stats</a>.</p>
      </main>
    )
  }
}
