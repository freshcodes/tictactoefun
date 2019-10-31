import { h } from 'preact'
// See: https://github.com/preactjs/enzyme-adapter-preact-pure
import { shallow } from 'enzyme'

import Game from '../src/lib/game.js'
import Board from '../src/components/board'

describe('Board component', () => {
	test('Has a table', () => {
		let game = Game.generateState(Game.generateEmptyBoard())
		let context = shallow(<Board win={game.winIndexes} board={game.board} />)

		expect(context.hasClass('board')).toBe(true)
		expect(context.exists('table')).toBe(true)
	})
})
