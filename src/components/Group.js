import React from 'react';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';

export default function Group({ group }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography className={classes.text} variant="subtitle2">
        {group.number}
      </Typography>
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    width: 'calc(100% / 18 - 15px / 18)',
    display: 'flex',
  },
  text: {
    alignSelf: 'flex-end',
    margin: '0 auto',
    opacity: 0.5,
  },
}));
