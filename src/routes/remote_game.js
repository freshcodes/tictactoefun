import { h, Component } from 'preact'
import { route } from 'preact-router'

import Board from '../components/board'
import ttt from '../lib/game'
import RemoteGameController from '../lib/remote_game_controller'

export default class RemoteGame extends Component {
  constructor (props) {
    super(props)

    this.state = {
      connectedToPeer: false,
      connectedToPlayer: false,
      waiting: true,
      error: false,
      win: [],
      board: ttt.generateEmptyBoard()
    }

    if (typeof window === 'undefined') return

    this.hostId = window.location.search.replace('?', '')

    // TODO: what to do if there isn't a host id

    this.controller = new RemoteGameController(ttt.O)
    this.controller.on('open', () => {
      this.setState({ connectedToPeer: true })
      this.controller.connectToHost(this.hostId)
    })
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
    return this.controller.player
  }

  get game () {
    return this.controller.game
  }

  boardClick = (event) => {
    console.log('BoardClick', event, this.game)
    if (this.game.finished) return
    if (this.game.nextPlayer !== this.player) return
    if (!event.isEmpty) alert('This space is already taken')

    this.controller.move(event.boardIndex)
  }

  restart = (event) => {
    this.controller.restart()
  }

  newgame = (event) => {
    route('/')
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
    return (
      <main>
        <p>Connecting to player...</p>
        {this.renderButtons()}
      </main>
    )
  }

  renderBoard () {
    const board = this.state.connectedToPlayer ? (<Board win={this.state.win} board={this.state.board} click={this.boardClick} />) : <div />
    return (
      <main>
        <p>You are playing as O.</p>
        <div class='board-wrapper'>
          {board}
          <span class='status'>{this.status()}</span>
        </div>
        {this.renderButtons()}
      </main>
    )
  }

  renderButtons () {
    const restart = this.game.finished ? <button onclick={this.restart}>Restart</button> : ''
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
