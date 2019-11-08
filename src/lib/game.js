// I don't recall where I saw this idea on how to check for a win
// but this is what it looks like visually:
//
// 273                 84
//    \               /
//      1 |   2 |   4  = 7
//   -----+-----+-----
//      8 |  16 |  32  = 56
//   -----+-----+-----
//     64 | 128 | 256  = 448
//   =================
//     73   146   292

const Game = {
  EASY: 0,
  INTERMEDIATE: 1,
  HARD: 2,

  E: 0,
  X: 1,
  O: 2,

  boardValues: [1, 2, 4, 8, 16, 32, 64, 128, 256],
  winningCounts: [7, 56, 73, 84, 146, 273, 292, 448],
  winningCoordinates: {
    7: [[0, 0], [0, 1], [0, 2]],
    56: [[1, 0], [1, 1], [1, 2]],
    84: [[0, 2], [1, 1], [2, 0]],
    73: [[0, 0], [1, 0], [2, 0]],
    146: [[0, 1], [1, 1], [2, 1]],
    273: [[0, 0], [1, 1], [2, 2]],
    292: [[0, 2], [1, 2], [2, 2]],
    448: [[2, 0], [2, 1], [2, 2]]
  },

  generateEmptyBoard: () => [Game.E, Game.E, Game.E, Game.E, Game.E, Game.E, Game.E, Game.E, Game.E],

  getWinningCoordinates (positionCount) {
    for (let i = 0, l = Game.winningCounts.length; i < l; i++) {
      let currentCount = Game.winningCounts[i]
      let result = Game.winningCounts[i] & positionCount
      if (result === currentCount) return Game.winningCoordinates[result]
    }
    return null
  },

  getWinningIndexesFromCoordinates (coordinates) {
    return coordinates.map((coordinate) => {
      return (coordinate[0] * 3) + coordinate[1]
    })
  },

  getCounts (board) {
    let xCount = 0
    let oCount = 0
    let emptyCount = 0
    for (var i = 0; i < 9; i++) {
      board[i] === Game.X ? xCount += Game.boardValues[i]
        : board[i] === Game.O ? oCount += Game.boardValues[i]
          : emptyCount += 1
    }
    return [emptyCount, xCount, oCount]
  },

  generateState (board, lastMoveBy) {
    const counts = Game.getCounts(board)
    const xWin = Game.getWinningCoordinates(counts[Game.X])
    const oWin = Game.getWinningCoordinates(counts[Game.O])
    const winCoordinates = xWin || oWin || []
    const winIndexes = Game.getWinningIndexesFromCoordinates(winCoordinates)
    const finished = !!xWin || !!oWin || counts[Game.E] === 0
    const draw = finished && !xWin && !oWin
    const absScore = finished ? (draw ? 0 : 10 - counts[Game.E]) : null
    const xScore = finished ? (draw ? 0 : (xWin ? absScore : -absScore)) : null
    const oScore = finished ? (draw ? 0 : (oWin ? absScore : -absScore)) : null
    const score = { [Game.X]: xScore, [Game.O]: oScore }
    const nextPlayer = lastMoveBy === Game.X ? Game.O : Game.X
    return { lastMoveBy, nextPlayer, board, counts, finished, xWin, oWin, winCoordinates, winIndexes, draw, score }
  },

  stateFromPlayerMove (state, index) {
    const board = state.board.slice(0)
    if (board[index] !== Game.E) throw new Error('That place on the board is already taken.')
    board[index] = state.nextPlayer
    return Game.generateState(board, state.nextPlayer)
  },

  getEmptyPlaceIndicies (board) {
    return board.reduce((places, value, index) => { if (value === Game.E) places.push(index); return places }, [])
  },

  getPotentialNextStates (state) {
    return Game.getEmptyPlaceIndicies(state.board).map((index) => {
      return Game.stateFromPlayerMove(state, index)
    })
  },

  minimax (state) {
    let value = 0
    const potentialStates = Game.getPotentialNextStates(state)
    potentialStates.forEach((potentialState) => {
      let score = Game.minimax(potentialState)
      value += score
    })
    if (state.finished && !state.draw) {
      if (state.xWin) value += state.score[Game.X]
      if (state.oWin) value -= Math.abs(state.score[Game.O])
    }
    return value
  },

  sortForX (a, b) { return a.minimax - b.minimax }, // maximize for X

  sortForO (a, b) { return b.minimax - a.minimax }, // minimize for X

  getSortedAINextStates (state) {
    return Game.getPotentialNextStates(state).map((state) => {
      state.minimax = Game.minimax(state)
      return state
    }).sort(Game[`sortFor${state.lastMoveBy === Game.X ? 'X' : 'O'}`])
  },

  stateFromAIMoveEasy (state) {
    const emptyPlaceIndicies = Game.getEmptyPlaceIndicies(state.board)
    const random = emptyPlaceIndicies[Math.floor(Math.random() * emptyPlaceIndicies.length)]
    return Game.stateFromPlayerMove(state, random)
  },

  stateFromAIMoveIntermediate (state) {
    if (state.counts[Game.E] === 9) {
      return Game.stateFromAIFirstMove(state)
    } else {
      const sortedStates = Game.getSortedAINextStates(state)
      const which = (sortedStates.length === 1 || Math.random() * 100 <= 40) ? 0 : 1
      return sortedStates[which]
    }
  },

  stateFromAIMoveHard (state) {
    if (state.counts[Game.E] === 9) {
      return Game.stateFromAIFirstMove(state)
    } else {
      const states = Game.getSortedAINextStates(state)
      // states.forEach((state) => {
      //   console.log("-------")
      //   console.log(this.stateBoardToString(state))
      //   console.log(state)
      //   console.log("-------")
      // })
      return states[0]
    }
  },

  stateFromAIMove (mode, state) {
    switch (mode) {
      case Game.EASY: return Game.stateFromAIMoveEasy(state)
      case Game.INTERMEDIATE: return Game.stateFromAIMoveIntermediate(state)
      case Game.HARD: return Game.stateFromAIMoveHard(state)
    }
  },

  stateFromAIFirstMove (state) {
    const potentials = [0, 2, 4, 6, 8]
    const random = potentials[Math.floor(Math.random() * potentials.length)]
    return Game.stateFromPlayerMove(state, random)
  },

  symbolForBoardSpot (state, spot) {
    return { 0: ' ', 1: 'X', 2: 'O' }[state.board[spot]]
  },

  stateBoardToString (state) {
    return `
${Game.symbolForBoardSpot(state, 0)} | ${Game.symbolForBoardSpot(state, 1)} | ${Game.symbolForBoardSpot(state, 2)}
---------
${Game.symbolForBoardSpot(state, 3)} | ${Game.symbolForBoardSpot(state, 4)} | ${Game.symbolForBoardSpot(state, 5)}
---------
${Game.symbolForBoardSpot(state, 6)} | ${Game.symbolForBoardSpot(state, 7)} | ${Game.symbolForBoardSpot(state, 8)}
    `
  }
}

export default Game

// let board = [
//   Game.E, Game.E, Game.E,
//   Game.E, Game.E, Game.E,
//   Game.E, Game.E, Game.E
// ]
// let state = Game.generateState(board, Game.O)
// // let board = [
// //   Game.X, Game.E, Game.E,
// //   Game.X, Game.O, Game.E,
// //   Game.E, Game.E, Game.E
// // ]
// // let state = Game.generateState(board, Game.X)
// // let board = [
// //   Game.O, Game.X, Game.E,
// //   Game.E, Game.X, Game.E,
// //   Game.O, Game.E, Game.E
// // ]
// // let state = Game.generateState(board, Game.O)
// while (!state.finished) {
//   state = state.nextPlayer === Game.X ? Game.stateFromAIMoveHard(state) : Game.stateFromAIMoveHard(state)
//   // state = state.nextPlayer === Game.X ? Game.stateFromAIMoveEasy(state) : Game.stateFromAIMoveHard(state)
//   // state = state.nextPlayer === Game.X ? Game.stateFromAIMoveHard(state) : Game.stateFromAIMoveEasy(state)
//   // console.log(state)
//   console.log("============")
//   console.log(Game.stateBoardToString(state))
//   console.log(state.lastMoveBy, state.minimax)
//   console.log("============")
// }
