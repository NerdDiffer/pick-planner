import React, { Component } from 'react';
import { Grid, Dropdown, Input } from 'semantic-ui-react';
import { calculatePickCounts } from '../calculator/index.js';

const Qty = ({ qty }) => (
  <Grid.Column width="2">{qty === undefined ? null : qty}</Grid.Column>
);

class Pack extends Component {
  constructor(props) {
    super(props);
    const { name, qty } = props;
    this.state = {
      pickCounts: calculatePickCounts(name, qty)
    };

    this.handleSelectPack = this.handleSelectPack.bind(this);
    this.handleInputQty = this.handleInputQty.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { name: nextName, qty: nextQty } = nextProps;
    const { name: currName, qty: currQty } = this.props;

    if (nextName !== currName || nextQty !== currQty) {
      const pickCounts = calculatePickCounts(nextName, nextQty);
      this.setState({ pickCounts });
    }
  }

  handleSelectPack(_ev, data) {
    const { packId, handleSelect } = this.props;
    const { value } = data;
    handleSelect(packId, value);
  }

  handleInputQty(ev, data) {
    const { packId, handleInput } = this.props;
    const { value } = ev.target;
    handleInput(packId, value)
  }

  render() {
    const { options, name, qty } = this.props;
    const { pickCounts } = this.state;

    if (!!pickCounts) {
      // using `var` b/c of conditional destructuring. do *not* want block-scoping.
      var { standard_14, tri_14, jazz_14, standard_09, tri_09, jazz_09 } = pickCounts;
    }

    return (
      <Grid.Row divided>
        <Grid.Column width="3">
          <Dropdown
            options={options}
            placeholder="Select pack"
            onChange={this.handleSelectPack}
            value={name}
          />
        </Grid.Column>
        <Grid.Column width="1">
          <Input
            className="pack-qty"
            placeholder="qty"
            type="number"
            size="mini"
            onChange={this.handleInputQty}
            value={qty}
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