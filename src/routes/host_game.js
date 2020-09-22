import { h, Component } from 'preact'
import { route } from 'preact-router'

import Board from '../components/board'
import ttt from '../lib/game'
import RemoteGameController from '../lib/remote_game_controller'

export default class HostGame extends Component {
  constructor (props) {
    super(props)

    this.state = {
      connectedToPeer: false,
      connectedToPlayer: false,
      waiting: false,
      error: false,
      win: [],
      board: ttt.generateEmptyBoard()
    }

    if (typeof window === 'undefined') return

    this.controller = new RemoteGameController(ttt.X)
    this.controller.on('open', () => this.setState({ connectedToPeer: true }))
    this.controller.on('connected', () => this.setState({ connectedToPlayer: true }))
    this.controller.on('updatedGameState', (game) => {
      const waiting = this.game.nextPlayer !== this.player
      this.setState({
        waiting,
        win: game.winIndexes,
        board: game.board
      })
    })
  }

  get player () {
    return this.controller && this.controller.player
  }

  get game () {
    return this.controller && this.controller.game
  }

  restart = (event) => {
    this.controller.restart()
  }

  newgame = (event) => {
    route('/')
  }

  boardClick = (event) => {
    console.log('BoardClick', event, this.game)
    if (this.game.finished) return
    if (this.game.nextPlayer !== this.player) return
    if (!event.isEmpty) alert('This space is already taken')

    this.controller.move(event.boardIndex)
  }

  status () {
    if (this.game && this.game.finished) {
      if (this.game.draw) return 'Tie'
      if ((this.player === ttt.X && this.game.xWin) || (this.player === ttt.O && this.game.oWin)) return 'You won'
      return 'You lost'
    } else {
      return this.state.waiting ? 'Waiting...' : 'Your turn...'
    }
  }

  renderConnecting () {
    return (
      <main>
        <p>Connecting...</p>
        {this.renderButtons()}
      </main>
    )
  }

  renderWaitingForPlayer () {
    const link = window.location.href.replace('/host', `/remote?${this.controller.peer.id}`)
    // TODO put link in input with auto select and copy to clip board feature
    const connect = (<p>Copy and paste this link to a friend: <input type='text' value={link} readonly /></p>)
    return (
      <main>
        <p>Waiting for another player...</p>
        {connect}
        {this.renderButtons()}
      </main>
    )
  }

  renderBoard () {
    const board = this.state.connectedToPlayer ? (<Board win={this.state.win} board={this.state.board} click={this.boardClick} />) : <div />
    return (
      <main>
        <p>You are playing as X.</p>
        <div class='board-wrapper'>
          {board}
          <span aria-live='polite' aria-atomic='true' class='status'>{this.status()}</span>
        </div>
        {this.renderButtons()}
      </main>
    )
  }

  renderButtons () {
    const restart = this.game && this.game.finished ? <button onclick={this.restart}>Restart</button> : ''
    return (
      <p>
        {restart}
        <button onclick={this.newgame}>New Game</button>
      </p>
    )
  }

  render (props, state) {
    if (!state.connectedToPeer) return this.renderConnecting()
    if (!state.connectedToPlayer) return this.renderWaitingForPlayer()
    return this.renderBoard()
  }
}
