import React from "react";
import "./Placeholder.css";

export default class Placeholder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isActive: this.props.isActive
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ isActive: nextProps.isActive });
  }

  render() {
    if (this.props.type === "l") {
      // for lanthaniods
      return (
        <div className="placeholder-container">
          <div
            className={`placeholder-body lanthanoid-bg ${
              this.state.isActive ? "active" : "inactive"
            }`}
          >
            <span className="d-none d-md-block">57-71</span>
          </div>
        </div>
      );
    } else if (this.props.type === "a") {
      // for actinoids
      return (
        <div className="placeholder-container">
          <div
            className={`placeholder-body actinoid-bg ${
              this.state.isActive ? "active" : "inactive"
            }`}
          >
            <span className="d-none d-md-block">89-103</span>
          </div>
        </div>
      );
    }
  }
}
