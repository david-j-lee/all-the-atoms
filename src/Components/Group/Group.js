import React from "react";
import "./Group.css";

export default class Group extends React.Component {
  render() {
    return (
      <div className="group">
        <div>{this.props.group.number}</div>
      </div>
    );
  }
}
