import ttt from '../../lib/game'

export default class RemoteGameController {
  constructor (component, hostId) {
    this.component = component
    this.hostId = hostId
    this.isHosting = !hostId
    this.player = this.isHosting ? ttt.X : ttt.O
    this.game = ttt.generateState(ttt.generateEmptyBoard(), ttt.O)

    this.setupPeer()
  }

  setupPeer () {
    this.peer = new Peer()

    this.peer.on('open', (peerId) => {
      console.debug(`Connected with peer server and got the ID: ${peerId}`)

      this.component.setState({ connectedToPeer: true })

      if (!this.isHosting) {
        this.connectToHost()
      }
    })

    this.peer.on('connection', (connection) => {
      console.debug(`Connection with another player established: ${connection.peer}`)

      this.component.setState({ connectedToPlayer: true })

      this.connection = connection

      this.connection.on('data', (data) => {
        this.handleDataFromPeer(data)
      })

      this.connection.on('close', () => {
        console.debug('Connection closed')
      })

      this.connection.on('error', (err) => {
        console.error('Error from connection', err)
      })
    })

    this.peer.on('close', () => {
      console.debug('Closed')
    })

    this.peer.on('disconnected', () => {
      console.debug('Disconnected')
    })

    this.peer.on('error', (err) => {
      console.error('Error from peerjs', err)
    })
  }

  connectToHost () {
    console.debug(`Attempting to connect to host: ${this.hostId}`)

    this.connection = this.peer.connect(this.hostId)

    this.connection.on('open', () => {
      console.debug('connection to host has been opened')

      this.component.setState({ connectedToPlayer: true })
    })

    this.connection.on('data', (data) => {
      this.handleDataFromHost(data)
    })

    this.connection.on('close', () => {
      // API docs says this isn't supported in firefox yet
      console.debug('Connection closed')
    })

    this.connection.on('error', (err) => {
      console.debug('Error from connection', err)
    })
  }

  handleDataFromHost (data) {
    console.debug('Received data from host', data)
    // TODO: should validate we got a good state
    this.game = data
    this.updateComponent()
  }

  handleDataFromPeer (data) {
    console.debug('Received data from peer', data)
    // TODO: should validate we got a good state
    this.game = data
    this.updateComponent()
  }

  move (boardIndex) {
    console.log('boardIndex', boardIndex)
    this.game = ttt.stateFromPlayerMove(this.game, boardIndex)
    console.log('new state', this.game)
    this.connection.send(this.game)
    this.updateComponent()
  }

  updateComponent () {
    this.component.setState({
      win: this.game.winIndexes,
      board: this.game.board
    })
  }
}
