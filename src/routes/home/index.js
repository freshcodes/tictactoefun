import { h, Component } from 'preact'
import { route } from 'preact-router'
import style from './style'

export default class Home extends Component {
  state = {
    player: 'x',
    mode: 'easy'
  }

  onchange = (event) => {
    const state = { [event.target.name]: event.target.value }
    this.setState(state)
  }

  start = (event) => {
    if (this.state.mode !== 'remote') {
      route(`/local/${this.state.player}/${this.state.mode}`)
    } else {
      alert('remote game play is coming soon')
    }
  }

  render () {
    return (
      <div class={style.home}>
        <h1>tictactoe.fun</h1>
        <p>Start a new game.</p>
        <p>I want to be: <select name='player' onchange={this.onchange}><option value='x'>X</option><option value='o'>O</option></select></p>
        <p>I want to play against: <select name='mode' onchange={this.onchange}><optgroup label='Computer'><option value='easy'>Easy</option><option value='medium'>Medium</option><option value='hard'>Hard</option></optgroup><option value='remote'>a friend</option></select></p>
        <button onclick={this.start}>Start!</button>
      </div>
    )
  }
}
