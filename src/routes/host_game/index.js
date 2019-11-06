import { h, Component } from 'preact'
import { route } from 'preact-router'

import Board from '../../components/board'
import ttt from '../../lib/game'
import RemoteGameController from '../../lib/remote_game_controler.js'
import { modeMap, playerMap } from '../../store'

export default class HostGame extends Component {
  constructor (props) {
    super(props)

    this.state = {
      connectedToPeer: false,
      connectedToPlayer: false,
      error: false,
      win: [],
      board: []
    }

    if (typeof window !== "undefined") {
      this.controller = new RemoteGameController(this)
    }
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

  status () {
    return ''
    // if (this.game && this.game.finished) {
    //   if (this.game.draw) return 'Tie'
    //   if ((this.player === ttt.X && this.game.xWin) || (this.player === ttt.O && this.game.oWin)) return 'You won'
    //   return 'You lost'
    // } else {
    //   return this.state.thinking ? 'Thinking...' : 'Your turn...'
    // }
  }

  renderConnecting () {
    return (<div><p>Connecting...</p></div>)
  }

  renderWaitingForPlayer () {
    let link = window.location.href.replace('/host', `/remote?${this.controller.peer.id}`)
    // TODO put link in input with auto select and copy to clip board feature
    let connect = (<p>Copy and paste this link to a friend: <input type="text" value={link} onfocus={this.select} readonly /></p>)
    return (
      <div>
        <p>Connected. Waiting for another player...</p>
        { this.controller.isHosting ? connect : '' }
      </div>
    )
  }

  renderBoard () {
    const board = this.controller.game ? (<Board win={this.controller.game.winIndexes} board={this.controller.game.board} click={this.boardClick} />) : <div />
    return (
      <div>
        <p>Playing...</p>
        <div class='board-wrapper'>
          {board}
          <span class='status'>{this.status()}</span>
        </div>
      </div>
    )
  }

  render (props, state) {
    if (!state.connectedToPeer) return this.renderConnecting()
    if (!state.connectedToPlayer) return this.renderWaitingForPlayer()
    return this.renderBoard()
  }
}
