import React, { Component } from 'react';
import { Grid, Dropdown, Input, Icon } from 'semantic-ui-react';

const Qty = ({ qty }) => (
  <Grid.Column width="1">{qty === undefined ? null : qty}</Grid.Column>
);

class Pack extends Component {
  constructor(props) {
    super(props);

    this.handleSelectPack = this.handleSelectPack.bind(this);
    this.handleInputQty = this.handleInputQty.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
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

  handleRemove(ev) {
    ev.preventDefault();
    const { packId, remPackRow } = this.props;
    remPackRow(packId);
  }

  render() {
    const { options, name, qty, pickCounts } = this.props;

    if (!!pickCounts) {
      // using `var` b/c of conditional destructuring. do *not* want block-scoping.
      var { standard_14, tri_14, jazz_14, standard_09, tri_09, jazz_09 } = pickCounts;
    }

    return (
      <Grid.Row divided>
        <Grid.Column>
          <Icon name="minus circle" link onClick={this.handleRemove} />
        </Grid.Column>
        <Grid.Column width="5">
          <Dropdown
            options={options}
            placeholder="Select pack"
            onChange={this.handleSelectPack}
            value={name}
          />
        </Grid.Column>
        <Grid.Column width="2">
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
        <Grid.Column></Grid.Column>
        <Qty qty={standard_09} />
        <Qty qty={tri_09} />
        <Qty qty={jazz_09} />
        <Grid.Column></Grid.Column>
      </Grid.Row>
    );
  }
}

export default Pack;
