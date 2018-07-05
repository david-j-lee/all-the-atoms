import React from "react";

import { withStyles } from "@material-ui/core";

const styles = theme => ({
  root: {
    width: 'calc(100% / 18 - 15px / 18)',
  },
});

export class Empty extends React.Component {
  render() {
    const { classes } = this.props;

    return <div className={classes.root} />;
  }
}

export default withStyles(styles)(Empty);