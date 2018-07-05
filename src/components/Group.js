import React from "react";

import { withStyles, Typography } from "@material-ui/core";

const styles = theme => ({
  root: {
    width: 'calc(100% / 18 - 15px / 18)',
    display: 'flex',
  },
  text: {
    alignSelf: 'flex-end',
    margin: '0 auto',
    opacity: .5,
  },
});

export class Group extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Typography className={classes.text}>
          {this.props.group.number}
        </Typography>
      </div>
    );
  }
}

export default withStyles(styles)(Group);
