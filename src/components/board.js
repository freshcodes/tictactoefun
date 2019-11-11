import { h, Component } from 'preact'

import ttt from '../lib/game'

export default class Board extends Component {
  textMap = {
    [ttt.E]: ' ',
    [ttt.X]: 'X',
    [ttt.O]: 'O'
  }

  click = (event) => {
    const td = event.target.closest('td')
    const boardIndex = parseInt(td.getAttribute('data-index'), 10)
    const state = parseInt(td.getAttribute('data-state'), 10)
    const isEmpty = state === 0
    this.props.click({ td, boardIndex, isEmpty })
  }

  renderCell (rowIndex, cellIndex) {
    let boardIndex = cellIndex + (rowIndex * 3)
    let cellState = this.props.board[boardIndex]
    let label = `Cell ${cellIndex}, ${rowIndex}`
    let text = this.textMap[cellState]
    let cssClass = this.props.win.indexOf(boardIndex) > -1 ? 'W' : ''

    return (
      <td data-index={boardIndex} data-state={cellState} class={cssClass}>
        <div>
          <button type='button' label={label} onClick={this.click}>{text}</button>
        </div>
      </td>
    )
  }

  renderRow (rowIndex) {
    let cells = [0, 1, 2].map(cellIndex => this.renderCell(rowIndex, cellIndex))

    return (
      <tr>
        {cells}
      </tr>
    )
  }

  render () {
    let rows = [0, 1, 2].map(rowIndex => this.renderRow(rowIndex))

    return (
      <div class='board'>
        <table>
          <caption>Game Board</caption>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    )
  }
}
