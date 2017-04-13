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
          <Pack options={PACKS_ARR} />
        </Grid>
      </Container>
    );
  }
}

export default App;
