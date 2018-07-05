import React from "react";

import { withStyles, Typography } from "@material-ui/core";

const styles = theme => ({
  root: {
    width: 15,
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  text: {
    opacity: .5,
    paddingRight: 5,
  },
});

export class Period extends React.Component {
  render() {
    const { classes } = this.props;

    if (this.props.period == null) {
      return <div className={classes.root} />;
    } else {
      return (
        <div className={classes.root}>
          <Typography className={classes.text}>
            {this.props.period.number}
          </Typography>
        </div>
      );
    }
  }
}

export default withStyles(styles)(Period);
