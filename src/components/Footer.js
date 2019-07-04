import React from 'react';

import Typography from '@material-ui/core/Typography';

// fonts & icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// material
import { makeStyles } from '@material-ui/styles';

export default function Footer() {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Typography component="p" className={classes.text}>
        Made by{' '}
        <a
          className={classes.link}
          href="http://devdavidlee.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          David Lee
        </a>{' '}
        for Michelle Kang{' '}
        <FontAwesomeIcon icon="heart" size="xs" className={classes.heart} />
      </Typography>
    </footer>
  );
}

const useStyles = makeStyles(theme => ({
  footer: {
    textAlign: 'center',
    padding: 5,
    opacity: 0.25,
    '& p': {
      fontSize: '0.65rem',
    },
  },
  heart: {
    color: '#ff5b5b',
  },
  link: {
    color: theme.palette.text.primary,
  },
  text: {
    fontSize: '.7rem',
  },
}));
