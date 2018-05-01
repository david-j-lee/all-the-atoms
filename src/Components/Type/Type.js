import React from "react";
import "./Type.css";

export default class Types extends React.Component {
  constructor(props) {
    super(props);

    this.searchByType = this.searchByType.bind(this);
    
    this.state = {
      isActive: this.props.isActive
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ isActive: nextProps.isActive });
  }

  searchByType = () => {
    if (this.state.isActive) {
      this.props.requestUpdateSearchInput("");
    } else {
      var term = `type:${this.props.type["name-plural"]}`;
      this.props.requestUpdateSearchInput(term);
    }
  };

  render() {
    var type = this.props.type;
    return (
      <button
        className={`legend-item ${type["name-plural"]
          .replace(/\s+/g, "-")
          .toLowerCase()}-bg`}
        onClick={this.searchByType}
      >
        <div
          className={`legend-item-content ${type["name-plural"]
            .replace(/\s+/g, "-")
            .toLowerCase()}-border-bottom ${
            this.state.isActive ? "active" : "inactive"
          }`}
        >
          {type["name-plural"]}
        </div>
      </button>
    );
  }
}
