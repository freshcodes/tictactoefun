import eventing from './eventing'
import Peer from 'peerjs'

/* Provides a foundation for utilizing
 * PeerJS as a mechanism to connect
 * from one friend to another to play
 * a game of TicTacToe.Fun
 */
class PeerBaseController {
  constructor () {
    this.peer = new Peer()

    this.peer.on('open', this.onPeerOpen.bind(this))
    this.peer.on('close', this.onPeerClose.bind(this))
    this.peer.on('connection', this.onPeerConnect.bind(this))
    this.peer.on('disconnected', this.onPeerDisconnect.bind(this))
    this.peer.on('error', this.onPeerError.bind(this))
  }

  connectToHost (hostId) {
    this.hostId = hostId
    this.connection = this.peer.connect(this.hostId)

    this.connection.on('open', this.onFriendToHostConnectionOpen.bind(this))
    this.connection.on('data', this.onFriendToHostConnectionData.bind(this))
    this.connection.on('close', this.onFriendToHostConnectionClose.bind(this))
    this.connection.on('error', this.onFriendToHostConnectionError.bind(this))
  }

  onPeerOpen (peerId) {
    console.debug(`Connected with peer server and got the ID: ${peerId}`)
    this.peerId = peerId
    this.trigger('open')
  }

  onPeerClose () {
    console.debug('Peer closed')
  }

  onPeerConnect (connection) {
    if (this.connection) {
      console.debug('User is already connected')
      return
    }

    // This is from the host perspective
    this.connection = connection

    this.connection.on('open', this.onHostToFriendConnectionOpen.bind(this))
    this.connection.on('data', this.onHostToFriendConnectionData.bind(this))
    this.connection.on('close', this.onHostToFriendConnectionClose.bind(this))
    this.connection.on('error', this.onHostToFriendConnectionError.bind(this))
  }

  onPeerDisconnect () {
    console.debug('Peer disconnected')
  }

  onPeerError (error) {
    console.error('Error from peerjs', error)
    this.trigger('error', error)
  }

  onFriendToHostConnectionOpen () {
    console.debug('Connected to host')
    this.trigger('connected')
  }

  onFriendToHostConnectionData (data) {
    console.debug('Received data from host', data)
  }

  onFriendToHostConnectionClose () {
    console.debug('Connected to host closed')
  }

  onFriendToHostConnectionError (error) {
    console.error('Connect to host error', error)
    this.trigger('error', error)
  }

  onHostToFriendConnectionOpen () {
    console.debug('Connected to friend')
    this.trigger('connected')
  }

  onHostToFriendConnectionData (data) {
    console.debug('Received data from friend', data)
  }

  onHostToFriendConnectionClose () {
    console.debug('Connected to friend closed')
  }

  onHostToFriendConnectionError (error) {
    console.error('Connect to friend error', error)
    this.trigger('error', error)
  }
}

Object.assign(PeerBaseController.prototype, eventing)

export default PeerBaseController
