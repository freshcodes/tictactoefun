import { h, Component } from 'preact'
import { route } from 'preact-router'
import Board from '../components/board'
import ttt from '../lib/game'

import { modeMap, playerMap } from '../store'

export default class LocalGame extends Component {
  constructor (props) {
    super(props)
    this.state = { thinking: false }
    this.player = playerMap[props.player.toLowerCase()]
    this.mode = modeMap[props.mode.toLowerCase()]
    this.gameKey = `local-${this.player}-${this.mode}`
    this.redirectIfInvalidSettings()
  }

  redirectIfInvalidSettings () {
    if (typeof this.player === 'undefined' || typeof this.mode === 'undefined') route('/')
  }

  componentDidUpdate () {
    if (!this.finished && this.game.finished) {
      this.onfinish()
    }
  }

  onfinish () {
    // TODO: maybe store stats?
    // console.log(this.game)
  }

  componentDidMount () {
    if (!this.game) {
      this.restart()
    } else {
      this.finished = this.game.finished
      this.checkAndTakeComputersTurn()
    }
  }

  checkAndTakeComputersTurn () {
    if (!this.game || this.game.finished) return
    if (this.game.nextPlayer === this.player) return
    this.setState({ thinking: true })
    window.requestAnimationFrame(() => {
      this.props.moveForComputer(this.gameKey, this.mode)
      this.setState({ thinking: false })
    })
  }

  restart = (event) => {
    this.finished = false
    this.props.newGame(this.gameKey, this.player)
  }

  newgame = (event) => {
    this.props.clearGameState(this.gameKey)
    route('/')
  }

  boardClick = (event) => {
    if (this.game.finished) return
    if (this.game.nextPlayer !== this.player) return
    if (!event.isEmpty) alert('This space is already taken')
    this.props.moveForPlayer(this.gameKey, event.boardIndex)
    window.requestAnimationFrame(() => {
      this.checkAndTakeComputersTurn()
    })
  }

  status () {
    if (this.game && this.game.finished) {
      if (this.game.draw) return 'Tie'
      if ((this.player === ttt.X && this.game.xWin) || (this.player === ttt.O && this.game.oWin)) return 'You won'
      return 'You lost'
    } else {
      return this.state.thinking ? 'Thinking...' : 'Your turn...'
    }
  }

  render ({ player, mode }) {
    const board = this.game ? (<Board win={this.game.winIndexes} board={this.game.board} click={this.boardClick} />) : <div />
    return (
      <div>
        <p>You are playing as <strong>{player.toUpperCase()}</strong> against the computer on <strong>{mode.toLowerCase()}</strong> mode.</p>
        <div class='board-wrapper'>
          {board}
          <span aria-live='polite' aria-atomic='true' class='status'>{this.status()}</span>
        </div>
        <p>
          <button onclick={this.restart}>Restart</button>&nbsp;&nbsp;
          <button onclick={this.newgame}>New Game</button>
        </p>
      </div>
    )
  }

  get game () {
    return this.props.games[this.gameKey]
  }
}
