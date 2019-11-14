import createStore from 'unistore'
import ttt from './lib/game.js'

const modeNamesMap = {
  [ttt.EASY]: 'Easy',
  [ttt.INTERMEDIATE]: 'Medium',
  [ttt.HARD]: 'Hard'
}
const playerNamesMap = {
  [ttt.X]: 'X',
  [ttt.O]: 'O'
}

const modeMap = {
  hard: ttt.HARD,
  medium: ttt.INTERMEDIATE,
  easy: ttt.EASY
}

const playerMap = {
  x: ttt.X,
  o: ttt.O
}

function localGameKeyFromUrlParams (player, mode) {
  player = playerMap[player.toLowerCase()]
  mode = modeMap[mode.toLowerCase()]
  return `local-${player}-${mode}`
}

function localGameKeyFromParams (player, mode) {
  return `local-${player}-${mode}`
}

const key = 'tictactoe.fun'

let localState = {}

if (typeof window !== 'undefined') { // localStorage is not available in pre-render
  localState = JSON.parse(localStorage.getItem(key) || '{}')
}

const initialState = Object.assign({
  lastUri: null,
  lastPlayerChoice: ttt.X,
  lastModeChoice: ttt.INTERMEDIATE,
  games: {},
  stats: {
    [ttt.EASY]: {
      [ttt.X]: { win: 0, loss: 0, tie: 0 },
      [ttt.O]: { win: 0, loss: 0, tie: 0 }
    },
    [ttt.INTERMEDIATE]: {
      [ttt.X]: { win: 0, loss: 0, tie: 0 },
      [ttt.O]: { win: 0, loss: 0, tie: 0 }
    },
    [ttt.HARD]: {
      [ttt.X]: { win: 0, loss: 0, tie: 0 },
      [ttt.O]: { win: 0, loss: 0, tie: 0 }
    },
    remote: {
      [ttt.X]: { win: 0, loss: 0, tie: 0 },
      [ttt.O]: { win: 0, loss: 0, tie: 0 }
    }
  }
}, localState)

const store = createStore(initialState)

const actions = (store) => ({
  navigate (state, event) {
    return { lastUri: event.url }
  },

  setLastPlayerChoice (state, player) {
    if (!playerNamesMap[player]) return
    return { lastPlayerChoice: player }
  },

  setLastModeChoice (state, mode) {
    if (!modeNamesMap[mode]) return
    return { lastModeChoice: mode }
  },

  newGame (state, gameKey, player) {
    let gameState = ttt.generateState(ttt.generateEmptyBoard())
    if (player !== ttt.X) gameState = ttt.stateFromAIFirstMove(gameState)
    const games = Object.assign({}, state.games)
    games[gameKey] = gameState
    return { games: games }
  },

  clearGameStateFromParams (state, player, mode) {
    const gameKey = localGameKeyFromParams(player, mode)
    this.clearGameState(gameKey)
  },

  clearGameState (state, gameKey) {
    const games = Object.assign({}, state.games)
    games[gameKey] = ttt.generateState(ttt.generateEmptyBoard())
    return { games: games }
  },

  moveForPlayer (state, gameKey, boardIndex) {
    const games = Object.assign({}, state.games)
    games[gameKey] = ttt.stateFromPlayerMove(games[gameKey], boardIndex)
    return { games: games }
  },

  moveForComputer (state, gameKey, mode) {
    const games = Object.assign({}, state.games)
    games[gameKey] = ttt.stateFromAIMove(mode, games[gameKey])
    return { games: games }
  },

  localSaveStats (state, gameKey) {
    const player = parseInt(gameKey.split('-')[1], 10)
    const mode = parseInt(gameKey.split('-')[2], 10)
    const game = state.games[gameKey]

    const stats = Object.assign({}, state.stats)
    const tie = game.draw
    const win = player === ttt.X ? !!game.xWin : !!game.oWin

    if (tie) {
      stats[mode][player].tie += 1
    } else if (win) {
      stats[mode][player].win += 1
    } else {
      stats[mode][player].loss += 1
    }

    return { stats: stats }
  }
})

if (typeof window !== 'undefined') { // localStorage is not available in pre-render
  // Keep state synced up with localStorage
  store.subscribe(state => { localStorage.setItem(key, JSON.stringify(state)) })

  // Keeps state in sync across multiple tabs
  window.addEventListener('storage', (event) => {
    if (event.key === key) {
      const state = JSON.parse(localStorage.getItem(key) || '{}')
      store.setState(state)
    }
  }, false)
}

export {
  store,
  actions,
  modeNamesMap,
  playerNamesMap,
  modeMap,
  playerMap,
  localGameKeyFromUrlParams
}
