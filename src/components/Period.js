import React from 'react';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';

export default function Period({ period }) {
  const classes = useStyles();

  if (!period) {
    return <div className={classes.root} />;
  } else {
    return (
      <div className={classes.root}>
        <Typography className={classes.text} variant="subtitle2">
          {period.number}
        </Typography>
      </div>
    );
  }
}

const useStyles = makeStyles(theme => ({
  root: {
    width: 15,
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  text: {
    opacity: 0.5,
    paddingRight: 5,
  },
}));
