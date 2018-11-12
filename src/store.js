import createStore from 'unistore'
import ttt from './lib/game.js'

const modeMap = {
  hard: ttt.HARD,
  medium: ttt.INTERMEDIATE,
  easy: ttt.EASY
}

const playerMap = {
  x: ttt.X,
  o: ttt.O
}

const key = 'tictactoe.fun'

// Keeps state in sync across multiple tabs
window.addEventListener('storage', (event) => {
  if (event.key === key) {
    const state = JSON.parse(localStorage.getItem(key) || '{}')
    store.setState(state)
  }
}, false)

let localState = {}
if (typeof window !== 'undefined') {
  localState = JSON.parse(localStorage.getItem(key) || '{}')
}

const initialState = Object.assign({
  lastUri: null,
  games: {}
}, localState)

const store = createStore(initialState)

store.subscribe(state => { localStorage.setItem(key, JSON.stringify(state)) })

const actions = (store) => ({
  navigate (state, event) {
    if (typeof window !== 'undefined' && window.ga) window.ga('send', 'pageview', event.url)
    return { lastUri: event.url }
  },

  newGame (state, gameKey, player) {
    let gameState = ttt.generateState(ttt.generateEmptyBoard())
    if (player !== ttt.X) gameState = ttt.stateFromAIFirstMove(gameState)
    let games = Object.assign({}, state.games)
    games[gameKey] = gameState
    return { games: games }
  },

  clearGameState (state, gameKey) {
    let games = Object.assign({}, state.games)
    games[gameKey] = ttt.generateState(ttt.generateEmptyBoard())
    return { games: games }
  },

  moveForPlayer (state, gameKey, boardIndex) {
    let games = Object.assign({}, state.games)
    games[gameKey] = ttt.stateFromPlayerMove(games[gameKey], boardIndex)
    return { games: games }
  },

  moveForComputer (state, gameKey, mode) {
    let games = Object.assign({}, state.games)
    games[gameKey] = ttt.stateFromAIMove(mode, games[gameKey])
    return { games: games }
  }
})

export {
  store,
  actions,
  modeMap,
  playerMap
}
