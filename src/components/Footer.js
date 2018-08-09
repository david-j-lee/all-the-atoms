import React from "react";

import Typography from "@material-ui/core/Typography";

// fonts & icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// material
import { withStyles } from "@material-ui/core";

const styles = theme => ({
  footer: {
    textAlign: 'center',
    padding: 5,
    opacity: 0.5,
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
});

export class Footer extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <footer className={classes.footer}>
        <Typography className={classes.text}>
          Made by{" "}
          <a className={classes.link}
            href="http://devdavidlee.com"
            target="_blank"
            rel="noopener noreferrer">
            David Lee
          </a>{" "}
          for Michelle Kang{" "}
          <FontAwesomeIcon icon="heart" size="xs" className={classes.heart} />
        </Typography>
      </footer>
    );
  }
}

export default withStyles(styles)(Footer);