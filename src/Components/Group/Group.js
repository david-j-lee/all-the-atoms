import React from "react";
import "./Group.css";

import { Typography } from "@material-ui/core";

export default class Group extends React.Component {
  render() {
    return (
      <div className="group">
        <Typography>{this.props.group.number}</Typography>
      </div>
    );
  }
}
