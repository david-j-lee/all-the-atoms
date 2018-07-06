import React from 'react';

// redux
import { connect } from 'react-redux';

// material
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 2,
    maxWidth: 750,
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
  actions: {
    paddingTop: theme.spacing.unit * 2,
  },
  section: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  content: {
    flexGrow: 1,
  },
  link: {
    color: theme.palette.text.primary,
    textDecoration: 'underline',
  },
});

export class About extends React.Component {
  render() {
    const { classes } = this.props;
    const gitHubLink = <a target="_blank" href="https://github.com/david-j-lee/theptable" className={classes.link} rel="noopener noreferrer">GitHub</a>;
    const payPalLink = <a target="_blank" href="https://paypal.me/davethedev" className={classes.link} rel="noopener noreferrer">PayPal</a>;

    return (
      <div className={classes.root}>
        <div className={classes.content}>
          <Typography variant="headline">
            About the P Table
          </Typography>
          <div className={classes.actions}>
            <Button variant="outlined" target="_blank" href="https://github.com/david-j-lee/theptable">GitHub</Button>
            <Button variant="outlined" target="_blank" href="https://paypal.me/davethedev">PayPal</Button>
          </div>
          <Typography variant="body1" className={classes.section}>
            The internet was in desperate need for a modern day 
            Periodic Table of Elements on the web, so I decided to create one.
            This shows the elements in a table and a list. You can search 
            elements and view elemental states based on a given temperature.
          </Typography>
          <Typography variant="body1" className={classes.section}>
            This application is currently in beta release. You can contribute 
            to this project through the {gitHubLink} page.
            Please report any issues or bugs on the GitHub page.
          </Typography>
          <Typography variant="body1" className={classes.section}>
            This application will always be free. If you are enjoying the
            application you can show your appreciation by donating to
            my {payPalLink}. This money will be used for hosting fees and
            coffee.
          </Typography>
        </div>
      </div>
    )
  }
}

export default connect(null, null)(withStyles(styles)(About));