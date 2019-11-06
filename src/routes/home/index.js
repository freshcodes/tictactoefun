import { h, Component } from 'preact'
import { route } from 'preact-router'

import { modeMap, playerMap } from '../../store'

export default class Home extends Component {
  state = {
    player: 'x',
    mode: 'medium'
  }

  onchange = (event) => {
    const state = { [event.target.name]: event.target.value }
    this.setState(state)
  }

  start = (event) => {
    if (this.state.mode !== 'remote') {
      route(`/local/${this.state.player}/${this.state.mode}`)
    } else {
      route(`/remote/${this.state.player}`)
    }
  }

  startLocalGame = (event) => {
    // TODO: should extract the gameKey calculation. it is used in LocalGame as well
    let player = playerMap[this.state.player.toLowerCase()]
    let mode = modeMap[this.state.mode.toLowerCase()]
    let gameKey = `local-${player}-${mode}`
    this.props.clearGameState(gameKey)
    route(`/local/${this.state.player}/${this.state.mode}`)
  }

  startRemoteGame = (event) => {
    route('/host')
  }

  render () {
    return (
      <div>
        <div class='title-screen-local-game'>
          <p>Play against the computer.</p>
          <p>
            <label for='player'>Play as:</label>
            <select value={this.state.player} id='player' name='player' onchange={this.onchange}>
              <option value='x'>X</option>
              <option value='o'>O</option>
            </select>
          </p>
          <p>
            <label for='mode'>Computer difficulty:</label>
            <select value={this.state.mode} id='mode' name='mode' onchange={this.onchange}>
              <option value='easy'>Easy</option>
              <option value='medium'>Medium</option>
              <option value='hard'>Hard</option>
            </select>
          </p>
          <p><button onclick={this.startLocalGame}>Play</button></p>
        </div>
        <div class='title-screen-remote-game'>
          <p>You can also play against a friend.</p>
          <p><button onclick={this.startRemoteGame}>Start Remote Game</button></p>
        </div>
      </div>
    )
  }
}
