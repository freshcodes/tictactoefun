import { h, Component } from 'preact'
import { route } from 'preact-router'
import Board from '../../components/board'

import { modeMap, playerMap } from '../../store'

export default class LocalGame extends Component {
  constructor (props) {
    super(props)
    this.player = playerMap[props.player.toLowerCase()]
    this.mode = modeMap[props.mode.toLowerCase()]
    this.gameKey = `local-${this.player}-${this.mode}`
    this.redirectIfInvalidSettings()
  }

  redirectIfInvalidSettings () {
    if (typeof this.player === 'undefined' || typeof this.mode === 'undefined') route('/')
  }

  componentDidUpdate () {
    this.checkAndTakeComputersTurn()
    if (!this.finished && this.game.finished) {
      this.onfinish()
    }
  }

  onfinish () {
    // TODO: maybe store stats?
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
    this.props.moveForComputer(this.gameKey, this.mode)
  }

  restart = (event) => {
    this.finished = false
    this.props.newGame(this.gameKey, this.player)
  }

  newgame = (event) => {
    this.props.clearGameState()
    route('/')
  }

  boardClick = (event) => {
    if (this.game.finished) return
    if (this.game.nextPlayer !== this.player) return
    if (!event.isEmpty) alert('This space is already taken')
    this.props.moveForPlayer(this.gameKey, event.boardIndex)
  }

  render ({ player, mode }) {
    const board = this.game ? (<Board win={this.game.winIndexes} board={this.game.board} click={this.boardClick} />) : <div />
    return (
      <div>
        <h1>TicTacToe.Fun</h1>
        <p>You are playing as <strong>{player.toUpperCase()}</strong> against the computer on <strong>{mode.toLowerCase()}</strong> mode.</p>
        {board}
        <button onclick={this.restart}>Restart</button>&nbsp;&nbsp;
        <button onclick={this.newgame}>New Game</button>
      </div>
    )
  }

  get game () {
    return this.props.games[this.gameKey]
  }
}
