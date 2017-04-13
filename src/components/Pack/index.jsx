import React, { Component } from 'react';
import { Grid, Dropdown, Input } from 'semantic-ui-react';
import Qty from './Qty.jsx'
import { calculatePickCounts } from '../../calculator/index.js';

class Pack extends Component {
  constructor(props) {
    super(props);

    this.state = {
      packName: null,
      quantity: 1,
      pickCountsObj: null,
      pickCounts: null
    };

    this.handleSelect = this.handleSelect.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.updatePickCounts = this.updatePickCounts.bind(this);
  }

  handleSelect(_ev, data) {
    const { value } = data;
    this.setState(
      { packName: value },
      () => this.updatePickCounts()
    );
  }

  handleInput(e) {
    const { value } = e.target;
    this.setState(
      { quantity: parseInt(value) },
      () => this.updatePickCounts()
    );
  }

  updatePickCounts() {
    const { packName, quantity } = this.state;
    const pickCountsObj = calculatePickCounts(packName, quantity);
    const pickCounts = Object.keys(pickCountsObj).map(key => {
      const qty = pickCountsObj[key];
      return `${key}: ${qty}`;
    }).join(' | ');
    this.setState({ pickCountsObj, pickCounts });
  }

  render() {
    const { pickCountsObj } = this.state;

    if (!!pickCountsObj) {
      var { standard_14, tri_14, jazz_14, standard_09, tri_09, jazz_09 } = pickCountsObj;
    }

    return (
      <Grid.Row divided>
        <Grid.Column width="3">
          <Dropdown
            options={this.props.options}
            placeholder="Select pack"
            onChange={this.handleSelect}
          />
        </Grid.Column>
        <Grid.Column width="1">
          <Input
            className="pack-qty"
            placeholder="qty"
            type="number"
            size="mini"
            onChange={this.handleInput}
            value={this.state.quantity}
          />
        </Grid.Column>
        <Qty qty={standard_14} />
        <Qty qty={tri_14} />
        <Qty qty={jazz_14} />
        <Qty qty={standard_09} />
        <Qty qty={tri_09} />
        <Qty qty={jazz_09} />
      </Grid.Row>
    );
  }
}

export default Pack;
