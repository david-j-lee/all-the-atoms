import React from "react";
import "./Period.css";

import { Typography } from "@material-ui/core";

export default class Period extends React.Component {
  render() {
    if (this.props.period == null) {
      return <div className="period" />;
    } else {
      return (
        <div className="period">
          <Typography>{this.props.period.number}</Typography>
        </div>
      );
    }
  }
}
