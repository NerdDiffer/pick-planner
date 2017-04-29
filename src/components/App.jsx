import React, { Component } from 'react';
import { Container, Grid, Icon } from 'semantic-ui-react';
import Pack from './Pack';
import Totals from './Totals'
import PACKS from '../calculator/packs.js';
import { findPackId, clone } from '../utils.js';
import { calculatePickCounts } from '../calculator/index.js';

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
      packs: [createPackData(0, 'P-Samp-M', 100)],
      totalsByPick: null,
      totalPicks: null
    };

    this.handleSelect = this.handleSelect.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.addPackRow = this.addPackRow.bind(this);
    this.remPackRow = this.remPackRow.bind(this);
    this.updatePickCounts = this.updatePickCounts.bind(this);
    this.updateTotals = this.updateTotals.bind(this);
  }

  handleSelect(packId, name) {
    const ind = findPackId(this.state.packs, packId);

    if (ind > -1) {
      const packs = clone(this.state.packs);
      const { qty } = packs[ind];
      packs.splice(ind, 1, createPackData(packId, name, qty));
      this.setState({ packs }, () => this.updatePickCounts(packId, name, qty));
    }
  }

  handleInput(packId, qty) {
    const ind = findPackId(this.state.packs, packId);

    if (ind > -1) {
      const packs = clone(this.state.packs);
      const { name } = packs[ind];
      packs.splice(ind, 1, createPackData(packId, name, qty));
      this.setState({ packs }, () => this.updatePickCounts(packId, name, qty));
    }
  }

  addPackRow() {
    const packs = clone(this.state.packs);
    // to allow user to change order of rows, would need to figure out a better
    // way to track rows by ID. start it here.
    const row = createPackData(packs.length, 'P-Samp-M', 0);
    packs.push(row);
    this.setState({ packs });
  }

  remPackRow(packId) {
    const ind = findPackId(this.state.packs, packId);

    if (ind > -1) {
      const packs = clone(this.state.packs);
      packs.splice(ind, 1);
      // decrement packId for each pack that came after pack you just removed
      let pack;
      for (let i = ind; i < packs.length; i++) {
        pack = packs[i];
        pack.packId -= 1;
      }

      this.setState({ packs }, this.updateTotals);
    }
  }

  updatePickCounts(packId, name, qty) {
    const packs = clone(this.state.packs);
    // assumes that the packId is same as its index in `state.packs` array.
    packs[packId].pickCounts = calculatePickCounts(name, qty);
    this.setState({ packs }, this.updateTotals);
  }

  updateTotals() {
    let totalPicks = 0;

    const totalsByPick = this.state.packs.reduce((totals, packRow) => {
      const { pickCounts } = packRow;
      let numPicks;

      for (let pick in pickCounts) {
        numPicks = pickCounts[pick];
        if (!totals.hasOwnProperty(pick)) { totals[pick] = 0; }
        totals[pick] += numPicks;
        totalPicks += numPicks;
      }

      return totals;
    }, {});

    this.setState({ totalPicks, totalsByPick });
  }

  render() {
    const { packs, totalPicks, totalsByPick } = this.state;

    return (
      <Container className="App">
        <Grid celled="internally" container textAlign="center" padded>
          <Grid.Row className="pick-header">
            <Grid.Column width="8">Pick Planner</Grid.Column>
            <Grid.Column width="3">1.4mm</Grid.Column>
            <Grid.Column width="3">0.9mm</Grid.Column>
            <Grid.Column>
              <a href="https://github.com/NerdDiffer/pick-planner" target="_blank">
                <Icon name="github" color="black" size="large" />
              </a>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="pick-subheader">
            <Grid.Column>
              <Icon name="add circle" link onClick={this.addPackRow} />
            </Grid.Column>
            <Grid.Column width="5">Pack</Grid.Column>
            <Grid.Column width="2">Qty</Grid.Column>
            <Grid.Column width="1">St</Grid.Column>
            <Grid.Column width="1">Tri</Grid.Column>
            <Grid.Column width="1">Jazz</Grid.Column>
            <Grid.Column width="1">St</Grid.Column>
            <Grid.Column width="1">Tri</Grid.Column>
            <Grid.Column width="1">Jazz</Grid.Column>
            <Grid.Column>Totals</Grid.Column>
          </Grid.Row>
          {!!packs ? renderPacks(packs, this.handleSelect, this.handleInput, this.remPackRow) : null}
          <Totals totalsByPick={totalsByPick} totalPicks={totalPicks} />
        </Grid>
      </Container>
    );
  }
}

export default App;

function renderPacks(packs, handleSelect, handleInput, remPackRow) {
  return packs.reduce((list, pack, ind) => {
    const { packId, name, qty, pickCounts } = pack;
    const key = `${ind}::${name}`;

    return list.concat(
      <Pack
        options={PACKS_ARR}
        name={name}
        qty={qty}
        pickCounts={pickCounts}
        handleInput={handleInput}
        handleSelect={handleSelect}
        remPackRow={remPackRow}
        packId={packId}
        key={key}
      />
    );
  }, []);
}

// packs: [{ packId: 0, name: 'P-Samp-M', qty: 200 }]
function createPackData(packId, name, qty) {
  return { packId, name, qty, pickCounts: null };
}
