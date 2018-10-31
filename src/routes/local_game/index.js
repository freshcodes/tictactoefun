import { h, Component } from 'preact'
import { route } from 'preact-router'
import Board from '../../components/board'
import ttt from '../../lib/game.js'

const modeMap = {
  hard: ttt.HARD,
  medium: ttt.INTERMEDIATE,
  easy: ttt.EASY
}

const playerMap = {
  x: ttt.X,
  o: ttt.O
}

export default class LocalGame extends Component {
  constructor (props) {
    super(props)
    this.mode = modeMap[this.props.mode.toLowerCase()]
    this.player = playerMap[this.props.player.toLowerCase()]
    this.computer = this.player === ttt.X ? ttt.O : ttt.X
    this.restart()
  }

  restart = (event) => {
    this.setState({ game: ttt.generateState(ttt.generateEmptyBoard()) })
    if (this.computer === ttt.X) {
      this.setState({ game: ttt.stateFromAIFirstMove(this.state.game) })
    }
  }

  newgame = (event) => {
    route('/')
  }

  boardClick = (event) => {
    if (!this.state.game.finished && event.isEmpty) {
      this.setState({
        game: ttt.stateFromPlayerMove(this.state.game, event.boardIndex)
      })
      if (!this.state.game.finished) {
        if (this.state.game.nextPlayer === this.computer) {
          this.setState({
            game: ttt.stateFromAIMove(this.mode, this.state.game)
          })
        }
      }
    }
  }

  render ({ player, mode }, { game }) {
    return (
      <div>
        <h1>TicTacToe.Fun</h1>
        <p>You are playing as <strong>{player.toUpperCase()}</strong> against the computer on <strong>{mode.toLowerCase()}</strong> mode.</p>
        <Board win={game.winIndexes} board={game.board} click={this.boardClick} />
        <button onclick={this.restart}>Restart</button>&nbsp;&nbsp;
        <button onclick={this.newgame}>New Game</button>
      </div>
    )
  }
}
