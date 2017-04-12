import React, { Component } from 'react';
import { Container, Grid, Dropdown, Input } from 'semantic-ui-react';
import Pack from './Pack.jsx';
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
        <Grid celled="internally">
          <Pack options={PACKS_ARR} />
        </Grid>
      </Container>
    );
  }
}

export default App;
