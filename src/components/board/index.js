import { h, Component } from 'preact'

export default class Board extends Component {
  click = (event) => {
    const td = event.target.closest('td')
    const boardIndex = parseInt(td.getAttribute('data-index'), 10)
    const state = parseInt(td.getAttribute('data-state'), 10)
    const isEmpty = state === 0
    this.props.click({ td, boardIndex, isEmpty })
  }

  render (props, state) {
    return (
      <div class="board">
        <table>
          <tbody>
            <tr>
              <td data-index='0' data-state={props.board[0]} onClick={this.click} class={`${props.win.indexOf(0) > -1 ? 'W' : ''}`}><div /></td>
              <td data-index='1' data-state={props.board[1]} onClick={this.click} class={`${props.win.indexOf(1) > -1 ? 'W' : ''}`}><div /></td>
              <td data-index='2' data-state={props.board[2]} onClick={this.click} class={`${props.win.indexOf(2) > -1 ? 'W' : ''}`}><div /></td>
            </tr>
            <tr>
              <td data-index='3' data-state={props.board[3]} onClick={this.click} class={`${props.win.indexOf(3) > -1 ? 'W' : ''}`}><div /></td>
              <td data-index='4' data-state={props.board[4]} onClick={this.click} class={`${props.win.indexOf(4) > -1 ? 'W' : ''}`}><div /></td>
              <td data-index='5' data-state={props.board[5]} onClick={this.click} class={`${props.win.indexOf(5) > -1 ? 'W' : ''}`}><div /></td>
            </tr>
            <tr>
              <td data-index='6' data-state={props.board[6]} onClick={this.click} class={`${props.win.indexOf(6) > -1 ? 'W' : ''}`}><div /></td>
              <td data-index='7' data-state={props.board[7]} onClick={this.click} class={`${props.win.indexOf(7) > -1 ? 'W' : ''}`}><div /></td>
              <td data-index='8' data-state={props.board[8]} onClick={this.click} class={`${props.win.indexOf(8) > -1 ? 'W' : ''}`}><div /></td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}
