import React, { Component } from 'react';
import { Container, Grid, Icon } from 'semantic-ui-react';
import Pack from './Pack';
import PACKS from '../calculator/packs.js';
import { findPackId, clone } from '../utils.js';
// import { calculateOrder } from '../calculator/index.js';

const PACKS_ARR = [];
for (let packName in PACKS) {
  PACKS_ARR.push({ value: packName, text: packName });
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //packs: null, // object: keys => packName, values => quantity
      //packs: [{ 'P-Samp-M': 4 }]
      packs: [createPackData(0, 'P-Samp-M', 200)]
    };

    this.handleSelect = this.handleSelect.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.addPackRow = this.addPackRow.bind(this);
  }

  handleSelect(packId, name) {
    const ind = findPackId(this.state.packs, packId);

    if (ind > -1) {
      const packs = clone(this.state.packs);
      const { qty } = packs[ind];
      packs.splice(ind, 1, createPackData(packId, name, qty));
      this.setState({ packs });
    }
  }

  handleInput(packId, qty) {
    const ind = findPackId(this.state.packs, packId);

    if (ind > -1) {
      const packs = clone(this.state.packs);
      const { name } = packs[ind];
      packs.splice(ind, 1, createPackData(packId, name, qty));
      this.setState({ packs });
    }
  }

  addPackRow() {
    const packs = clone(this.state.packs);
    const row = createPackData(packs.length, 'P-Samp-M');
    const newPacks = packs.concat(row);
    this.setState({ packs: newPacks });
  }

  render() {
    const { packs } = this.state;

    return (
      <Container className="App">
        <Grid celled="internally" container>
          <Grid.Row>
            <Grid.Column width="4" color="grey"></Grid.Column>
            <Grid.Column width="6">1.4mm</Grid.Column>
            <Grid.Column width="6">0.9mm</Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width="3">Pack</Grid.Column>
            <Grid.Column width="1">Qty</Grid.Column>
            <Grid.Column width="2">St</Grid.Column>
            <Grid.Column width="2">Tri</Grid.Column>
            <Grid.Column width="2">Jazz</Grid.Column>
            <Grid.Column width="2">St</Grid.Column>
            <Grid.Column width="2">Tri</Grid.Column>
            <Grid.Column width="2">Jazz</Grid.Column>
          </Grid.Row>
          {!!packs ? renderPacks(packs, this.handleSelect, this.handleInput) : null}
          <Icon name="add circle" link onClick={this.addPackRow} />
        </Grid>
      </Container>
    );
  }
}

export default App;

function renderPacks(packs, handleSelect, handleInput) {
  console.log(packs);
  return packs.reduce((list, pack, ind) => {
    const { name, qty } = pack;
    const key = `${ind}::${name}`;

    return list.concat(
      <Pack
        options={PACKS_ARR}
        name={name}
        qty={qty}
        handleInput={handleInput}
        handleSelect={handleSelect}
        packId={ind}
        key={key}
      />
    );
  }, []);
}

// packs: [{ packId: 0, name: 'P-Samp-M', qty: 200 }]
function createPackData(packId, name, qty = 1) {
  return { packId, name, qty };
}
