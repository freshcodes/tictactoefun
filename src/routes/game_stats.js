import { h, Component } from 'preact'
import { connect } from 'unistore/preact'

import ttt from '../lib/game'
import { modeNamesMap, playerNamesMap } from '../store'

class GameStats extends Component {
  renderRow (mode, player, stat) {
    return (
      <tr>
        <td class='mode'>{modeNamesMap[mode]}</td>
        <td class='player'>{playerNamesMap[player]}</td>
        <td class='win'>{stat.win}</td>
        <td class='loss'>{stat.loss}</td>
        <td class='tie'>{stat.tie}</td>
      </tr>
    )
  }

  render ({ stats }) {
    let order = [
      [ttt.EASY, ttt.X],
      [ttt.EASY, ttt.O],
      [ttt.INTERMEDIATE, ttt.X],
      [ttt.INTERMEDIATE, ttt.O],
      [ttt.HARD, ttt.X],
      [ttt.HARD, ttt.O]
    ]
    let rows = order.map(([mode, player]) => this.renderRow(mode, player, stats[mode][player]))
    return (
      <main class='stats'>
        <table class='stats'>
          <caption>Historical stats of wins, losses and ties.</caption>
          <thead>
            <tr>
              <th class='mode'>Mode</th>
              <th class='player'>Player</th>
              <th class='win'>Wins</th>
              <th class='loss'>Losses</th>
              <th class='loss'>Ties</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
        <p><a href='/'>Back home</a></p>
      </main>
    )
  }
}

export default connect('stats')(GameStats)
