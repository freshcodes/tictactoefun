import { h, Component } from 'preact'
import { connect } from 'unistore/preact'

import { modeNamesMap, actions } from '../store'

class ModeChoice extends Component {
  handleChange = (event) => {
    this.props.setLastModeChoice(parseInt(event.target.value, 10))
  }

  render ({ lastModeChoice }) {
    let options = Object.entries(modeNamesMap).map(([value, name]) => {
      value = parseInt(value, 10)
      return (<option value={value} selected={lastModeChoice === value}>{name}</option>)
    })

    return (
      <div class='mode-choice'>
        <label>
          <span>Computer difficulty:</span>
          <select name='mode' onchange={this.handleChange}>
            {options}
          </select>
        </label>
      </div>
    )
  }
}

export default connect('lastModeChoice', actions)(ModeChoice)
