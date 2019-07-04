import React from 'react';
import { makeStyles } from '@material-ui/styles';

export default function Placeholder({ isActive, type }) {
  const classes = useStyles();
  let className, text;

  switch (type) {
    case 'l':
      className = 'lanthanoid';
      text = '57-71';
      break;
    case 'a':
      className = 'actinoid';
      text = '89-103';
      break;
    default:
      break;
  }

  return (
    <div className={classes.root}>
      <div
        className={[
          classes.body,
          className + '-bg',
          isActive ? classes.active : classes.inactive,
        ].join(' ')}
      >
        <span>{text}</span>
      </div>
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    width: 'calc(100% / 18 - 15px / 18)',
  },
  active: {
    opacity: 1,
  },
  inactive: {
    opacity: 0.25,
  },
  body: {
    margin: 1,
    padding: 4,
    height: 'calc(100% - 2px)',
    fontSize: '9pt',
    lineHeight: 1.3,
    color: theme.palette.getContrastText(theme.palette.text.primary),
  },
}));
