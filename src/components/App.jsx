import React, { Component } from 'react';
import { Container, Grid, Dropdown, Input } from 'semantic-ui-react';
import Pack from './Pack';
import PACKS from '../calculator/packs.js';
import { calculateOrder } from '../calculator/index.js';

const PACKS_ARR = [];
for (let packName in PACKS) {
  PACKS_ARR.push({ value: packName, text: packName });
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Container text className="App">
        <Grid celled="internally" container>
          <Grid.Row>
            <Grid.Column></Grid.Column>
            <Grid.Column width="6" color="grey"></Grid.Column>
            <Grid.Column width="3">1.4mm</Grid.Column>
            <Grid.Column width="2" color="black"></Grid.Column>
            <Grid.Column width="3">0.9mm</Grid.Column>
            <Grid.Column></Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column></Grid.Column>
            <Grid.Column width="4">Pack</Grid.Column>
            <Grid.Column width="2">Qty</Grid.Column>
            <Grid.Column>St</Grid.Column>
            <Grid.Column>Tri</Grid.Column>
            <Grid.Column>Jazz</Grid.Column>
            <Grid.Column width="2" color="black"></Grid.Column>
            <Grid.Column>St</Grid.Column>
            <Grid.Column>Tri</Grid.Column>
            <Grid.Column>Jazz</Grid.Column>
            <Grid.Column></Grid.Column>
          </Grid.Row>
          <Pack options={PACKS_ARR} />
        </Grid>
      </Container>
    );
  }
}

export default App;
