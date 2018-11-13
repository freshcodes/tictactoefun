import { h, Component } from 'preact'
import { route } from 'preact-router'

export default class Home extends Component {
  state = {
    player: 'x',
    mode: 'medium'
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
      <div>
        <p><label for='player'>I want to play as:</label><select id='player' name='player' onchange={this.onchange}><option value='x'>X</option><option value='o'>O</option></select></p>
        <p><label for='mode'>I want to play against:</label><select id='mode' name='mode' onchange={this.onchange}><optgroup label='Computer'><option value='easy'>Easy</option><option value='medium' selected>Medium</option><option value='hard'>Hard</option></optgroup><option value='remote'>a friend</option></select></p>
        <p><button onclick={this.start}>Start!</button></p>
      </div>
    )
  }
}
