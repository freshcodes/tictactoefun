import { h } from 'preact'
// See: https://github.com/preactjs/enzyme-adapter-preact-pure
import { shallow } from 'enzyme'

import Game from '../../src/lib/game.js'
import Board from '../../src/components/board'

describe('Board component', () => {
	test('Has a table', () => {
		let game = Game.generateState(Game.generateEmptyBoard())
		let context = shallow(<Board win={game.winIndexes} board={game.board} />)

		expect(context.hasClass('board')).toBe(true)
		expect(context.exists('table')).toBe(true)
	})

	test('button labels', () => {
		let game = Game.generateState(Game.generateEmptyBoard())
		let context = shallow(<Board win={game.winIndexes} board={game.board} />)

		expect(context.exists('button[label="Cell 0, 0"]')).toBe(true)
		expect(context.exists('button[label="Cell 2, 2"]')).toBe(true)
	})

	test('button text', () => {
		let board = Game.generateEmptyBoard()
		board[1] = Game.X
		board[2] = Game.O
		let game = Game.generateState(board)
		let context = shallow(<Board win={game.winIndexes} board={game.board} />)

		expect(context.find('button[label="Cell 1, 0"]').text()).toBe('X')
		expect(context.find('button[label="Cell 2, 0"]').text()).toBe('O')
	})

	test('click on empty space', () => {
    expect.assertions(2)
		let onClick = function (event) {
			expect(event.boardIndex).toBe(0)
			expect(event.isEmpty).toBe(true)
		}

		let game = Game.generateState(Game.generateEmptyBoard())
		let context = shallow(<Board win={game.winIndexes} board={game.board} click={onClick} />)

		context.find('button[label="Cell 0, 0"]').simulate('click')
	})

	test('click on occupied space', () => {
    expect.assertions(2)
		let onClick = function (event) {
			expect(event.boardIndex).toBe(0)
			expect(event.isEmpty).toBe(false)
		}

		let board = Game.generateEmptyBoard()
		board[0] = Game.X
		let game = Game.generateState(board)
		let context = shallow(<Board win={game.winIndexes} board={game.board} click={onClick} />)

		context.find('button[label="Cell 0, 0"]').simulate('click')
	})
})
