import React, { Component } from 'react';
import { Grid, Dropdown, Input } from 'semantic-ui-react';
import { calculatePickCounts } from '../calculator/index.js';

class Pack extends Component {
  constructor(props) {
    super(props);

    this.state = {
      packName: null,
      quantity: 1
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
    this.setState({ pickCounts });
  }

  render() {
    return (
      <Grid.Row divided>
        <Grid.Column width={4}>
          <Dropdown
            options={this.props.options}
            placeholder="Select pack"
            onChange={this.handleSelect}
          />
        </Grid.Column>
        <Grid.Column width={1}>
          <Input
            placeholder="qty"
            type="number"
            size="mini"
            onChange={this.handleInput}
            value={this.state.quantity}
          />
        </Grid.Column>
        <code>
          {this.state.pickCounts}
        </code>
      </Grid.Row>
    );
  }
}

export default Pack;
