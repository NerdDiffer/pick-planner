import React from 'react';
import { Grid } from 'semantic-ui-react';

export default ({ qty }) => (
  <Grid.Column>{qty === undefined ? null : qty}</Grid.Column>
);
