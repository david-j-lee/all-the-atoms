import React from "react";

import { withStyles } from "@material-ui/core";

const styles = theme => ({
  root: {
    width: 'calc(100% / 18 - 15px / 18)',
  },
  body: {
    margin: 1,
    padding: 4,
    height: 'calc(100% - 2px)',
    fontSize: '9pt',
    lineHeight: 1.3,
  },
});

export class Placeholder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isActive: this.props.isActive
    };
  }

  componentWillMount() {
    this.setState({ isActive: this.props.isActive });
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.isActive !== nextProps.isActive) {
      this.setState({ isActive: nextProps.isActive });
    }
  }

  render() {
    const { classes } = this.props;
    let type, text;

    if (this.props.type === "l") {
      type = "lanthanoid";
      text = "57-71";
    } else if (this.props.type === "a") {
      type = "actinoid";
      text = "89-103";
    }

    return (
      <div className={classes.root}>
        <div className={[classes.body, type + '-bg'].join(" ")}>
          <span>{text}</span>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Placeholder);