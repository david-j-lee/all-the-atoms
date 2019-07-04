import React from 'react';
import { makeStyles } from '@material-ui/styles';

export default function Empty() {
  const classes = useStyles();

  return <div className={classes.root} />;
}

const useStyles = makeStyles(theme => ({
  root: {
    width: 'calc(100% / 18 - 15px / 18)',
  },
}));
