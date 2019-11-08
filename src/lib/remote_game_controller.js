import PeerBaseController from './peer_base_controller'
import ttt from './game'

export default class RemoteGameController extends PeerBaseController {
  constructor (player) {
    super()
    this.player = player
    this.game = ttt.generateState(ttt.generateEmptyBoard(), ttt.O)
  }

  move (boardIndex) {
    this.game = ttt.stateFromPlayerMove(this.game, boardIndex)
    this.connection.send(this.game)
    this.trigger('updatedGameState', this.game)
  }

  onHostToFriendConnectionData (data) {
    super.onHostToFriendConnectionData(data)

    this.validateData(data)
    this.game = data
    this.trigger('updatedGameState', this.game)
  }

  onFriendToHostConnectionData (data) {
    super.onFriendToHostConnectionData(data)

    this.validateData(data)
    this.game = data
    this.trigger('updatedGameState', this.game)
  }

  validateData (data) {
    if (data.lastMoveBy !== this.game.nextPlayer) throw new Error('Received invalid data')
    if ((this.game.counts[0] - 1) !== data.counts[0]) throw new Error('Received invalid data')
  }
}
