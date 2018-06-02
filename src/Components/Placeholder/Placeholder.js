import React from "react";
import "./Placeholder.css";

export default class Placeholder extends React.Component {
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
    let type, text;
    if (this.props.type === "l") {
      type = "lanthanoid";
      text = "57-71";
    } else if (this.props.type === "a") {
      type = "actinoid";
      text = "89-103";
    }
    return (
      <div className="placeholder-container">
        <div
          className={`placeholder-body ${type}-bg ${
            this.state.isActive ? "active" : "inactive"
          }`}
        >
          <span>{text}</span>
        </div>
      </div>
    );
  }
}
