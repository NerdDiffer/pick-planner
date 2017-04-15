import React from 'react';
import { Grid } from 'semantic-ui-react';

const Totals = ({ totalsByPick, totalPicks }) => {
  if (!totalsByPick) { return null; }

  const { standard_14, tri_14, jazz_14, standard_09, tri_09, jazz_09 } = totalsByPick;

  return (
    <Grid.Row className="total">
      <Grid.Column width="8">Totals</Grid.Column>
      <Grid.Column>{standard_14}</Grid.Column>
      <Grid.Column>{tri_14}</Grid.Column>
      <Grid.Column>{jazz_14}</Grid.Column>
      <Grid.Column>{standard_09}</Grid.Column>
      <Grid.Column>{tri_09}</Grid.Column>
      <Grid.Column>{jazz_09}</Grid.Column>
      <Grid.Column>{totalPicks}</Grid.Column>
    </Grid.Row>
  );
};

export default Totals;
