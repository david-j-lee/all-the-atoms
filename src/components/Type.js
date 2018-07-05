import React from "react";

// redux
import { connect } from "react-redux";
import { searchElements } from "../actions/ptableActions";

// material
import { withStyles } from '@material-ui/core';
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  root: {
    margin: '0 5px 5px 5px',
    padding: '1px 3px',
    fontWeight: 400,
    border: 'none',
  },
  content: {
    padding: '0 3px',
  },
});

export class Type extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isActive: false
    };

    this.searchTerm = `type: ${this.props.type["name-plural"]}`;
  }

  componentWillMount() {
    this.getStatus(this.props.search);
  }

  componentWillReceiveProps(nextProps) {
    this.getStatus(nextProps.search);
  }

  searchByType = () => {
    if (this.state.isActive) {
      this.props.searchElements("");
      this.setState({ isActive: false });
    } else {
      this.props.searchElements(this.searchTerm);
      this.setState({ isActive: true });
    }
  };

  getStatus(search) {
    if (search.toLowerCase() !== this.searchTerm.toLowerCase()) {
      this.setState({ isActive: false });
    } else {
      this.setState({ isActive: true });
    }
  }

  render() {
    const { classes, type } = this.props;
    const className = type["name-plural"].replace(/\s+/g, "-").toLowerCase();

    return (
      <button onClick={this.searchByType}
        className={[classes.root, 'legend-item', className + "-bg", 
          (this.state.isActive ? "active" : "inactive")].join(" ")}>
        <div className={["legend-item-content", className + "-border-bottom"].join(" ")}>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Type));
