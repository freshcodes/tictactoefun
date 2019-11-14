import { h, Component } from 'preact'
import { connect } from 'unistore/preact'

import { playerNamesMap, actions } from '../store'

class PlayerChoice extends Component {
  handleChange = (event) => {
    this.props.setLastPlayerChoice(parseInt(event.target.value, 10))
  }

  render ({ lastPlayerChoice }) {
    const options = Object.entries(playerNamesMap).map(([value, name]) => {
      value = parseInt(value, 10)
      return (<option key={value} value={value} selected={lastPlayerChoice === value}>{name}</option>)
    })

    return (
      <div class='player-choice'>
        <label>
          <span>Play as:</span>
          <select name='player' onchange={this.handleChange}>
            {options}
          </select>
        </label>
      </div>
    )
  }
}

export default connect('lastPlayerChoice', actions)(PlayerChoice)
