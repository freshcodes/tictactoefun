import Game from '../../src/lib/game.js'

describe('Game', () => {
  test('generateEmptyBoard', () => {
    const emptyBoard = Game.generateEmptyBoard()

    expect(emptyBoard.length).toBe(9)
    expect(emptyBoard.every(space => space === Game.E)).toBe(true)
  })

  test('getCounts', () => {
    const emptyBoard = Game.generateEmptyBoard()
    expect(Game.getCounts(emptyBoard)).toStrictEqual([9, 0, 0])

    const board1 = Game.generateEmptyBoard()
    board1[0] = Game.X // Game.boardValues[0] === 1
    board1[1] = Game.O // Game.boardValues[1] === 2
    board1[2] = Game.X // Game.boardValues[1] === 4
    expect(Game.getCounts(board1)).toStrictEqual([6, 5, 2])
  })

  test('generateState', () => {
    const emptyBoard = Game.generateEmptyBoard()
    const state = Game.generateState(emptyBoard, Game.O)

    expect(state.lastMoveBy).toBe(Game.O)
    expect(state.nextPlayer).toBe(Game.X)
    expect(state.board.every(space => space === Game.E)).toBe(true)
    expect(state.counts).toStrictEqual([9, 0, 0])
    expect(state.finished).toBe(false)
    expect(state.xWin).toBe(null)
    expect(state.oWin).toBe(null)
    expect(state.winCoordinates).toStrictEqual([])
    expect(state.winIndexes).toStrictEqual([])
    expect(state.draw).toBe(false)
    expect(state.score[Game.X]).toStrictEqual(null)
    expect(state.score[Game.O]).toStrictEqual(null)
  })

  test('stateFromPlayerMove', () => {
    const emptyBoard = Game.generateEmptyBoard()
    const initialState = Game.generateState(emptyBoard, Game.O)
    const nextState = Game.stateFromPlayerMove(initialState, 4)

    expect(nextState.lastMoveBy).toBe(Game.X)
    expect(nextState.nextPlayer).toBe(Game.O)
    expect(nextState.counts).toStrictEqual([8, 16, 0]) // boardValues[4] === 16
    expect(nextState.board[4]).toBe(Game.X)
  })
})
