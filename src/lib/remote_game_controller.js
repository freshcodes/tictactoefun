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

  restart () {
    this.game = ttt.generateState(ttt.generateEmptyBoard(), ttt.O)
    this.connection.send(this.game)
    this.trigger('updatedGameState', this.game)
  }

  onHostToFriendConnectionData (data) {
    super.onHostToFriendConnectionData(data)

    this.game = data
    this.trigger('updatedGameState', this.game)
  }

  onFriendToHostConnectionData (data) {
    super.onFriendToHostConnectionData(data)

    this.game = data
    this.trigger('updatedGameState', this.game)
  }
}
