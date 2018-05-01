import React from "react";
import "./Period.css";

export default class Period extends React.Component {
  render() {
    if (this.props.period == null) {
      return <div className="period" />
    } else {
      return (
        <div className="period">
          <div>{this.props.period.number}</div>
        </div>
      );
    }
  }
}
