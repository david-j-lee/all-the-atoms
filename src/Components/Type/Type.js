import React from "react";
import "./Type.css";

// redux
import { connect } from "react-redux";
import { searchElements } from "../../Actions/ptableAction";
import { Typography } from "@material-ui/core";

export class Type extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isActive: false };
    this.searchTerm = `type: ${this.props.type["name-plural"]}`;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.search !== this.searchTerm) {
      this.setState({ isActive: false });
    } else {
      this.setState({ isActive: true });
    }
  }

  searchByType = () => {
    if (this.state.isActive) {
      this.props.searchElements("");
      this.setState({ isActive: false });
    } else {
      this.props.searchElements(this.searchTerm);
      this.setState({ isActive: true });
    }
  }

  render() {
    var type = this.props.type;
    return (
      <button
        className={`legend-item ${type["name-plural"]
          .replace(/\s+/g, "-")
          .toLowerCase()}-bg ${this.state.isActive ? "active" : "inactive"}`}
        onClick={this.searchByType}
      >
        <div
          className={`legend-item-content ${type["name-plural"]
            .replace(/\s+/g, "-")
            .toLowerCase()}-border-bottom`}
        >
          <Typography>{type["name-plural"]}</Typography>
        </div>
      </button>
    );
  }
}

const mapStateToProps = state => {
  return {
    search: state.ptable.search
  };
};

const mapDispatchToProps = {
  searchElements
};

export default connect(mapStateToProps, mapDispatchToProps)(Type);
