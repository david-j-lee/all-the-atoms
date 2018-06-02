import React from "react";
import { PropTypes } from "prop-types";
import "./PTable.css";

// redux
import { connect } from "react-redux";

// data
import gridMapData from "../../Data/grid-map.json";
import groupData from "../../Data/groups.json";
import periodData from "../../Data/periods.json";
import typeData from "../../Data/types.json";

// components
import Element from "../Element/Element";
import Empty from "../Empty/Empty";
import Group from "../Group/Group";
import Period from "../Period/Period";
import Placeholder from "../Placeholder/Placeholder";
import Type from "../Type/Type";

export class PTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Tiles: [],
      Types: []
    };
  }

  componentWillMount() {
    this.generateTiles(this.props.elements, this.props.search);
    this.generateTypes();
  }

  componentWillReceiveProps(nextProps) {
    this.generateTiles(nextProps.elements, nextProps.search);
  }

  generateTiles = (elements, search) => {
    let Tiles = gridMapData.map((map, index) => {
      const type = this.getTileType(map);
      return this.generateTile(index, type, map, elements, search);
    });
    this.setState({ Tiles: Tiles });
  };

  getTileType(map) {
    let type = "empty";
    if (typeof map === "number") {
      type = "element";
    } else if (typeof map === "string") {
      if (map === "") {
        type = "empty";
      } else if (map.indexOf("g") !== -1) {
        type = "group";
      } else if (map.indexOf("p") !== -1) {
        type = "period";
      } else if (map === "l" || map === "a") {
        type = "placeholder";
      }
    }
    return type;
  }

  generateTile(index, type, map, elements, search) {
    switch (type) {
      case "element":
        const element = this.getElement(elements, map);
        return <Element key={index} element={{ ...element }} />;
      case "group":
        return <Group key={index} group={this.getGroup(map)} />;
      case "period":
        return <Period key={index} period={this.getPeriod(map)} />;
      case "placeholder":
        return (
          <Placeholder
            key={index}
            type={map}
            isActive={this.getPlaceholderStatus(map, search)}
          />
        );
      default:
        return <Empty key={index} />;
    }
  }

  getElement(elements, map) {
    return elements.find(e => e["atomic-number"] === map);
  }

  getGroup(map) {
    return groupData.find(g => g.number.toString() === map.replace("g", ""));
  }

  getPeriod(map) {
    return periodData.find(p => p.number.toString() === map.replace("p", ""));
  }

  getPlaceholderStatus(map, search) {
    if (search) {
      const terms = search.toLowerCase().split(":");
      if (terms[0] === "type") {
        switch (map) {
          case "l":
            return terms[1].trim().indexOf("lanthanoid") !== -1;
          case "a":
            return terms[1].trim().indexOf("actinoid") !== -1;
          default:
            return false;
        }
      }
    } else {
      return true;
    }
  }

  generateTypes = () => {
    let Types = typeData.map((a, i) => {
      return <Type key={i} type={a} />;
    });
    this.setState({ Types: Types });
  };

  render() {
    return (
      <div className="content container-fluid mt-3">
        <div className="p-table-container">
          <div className="p-table">
            <div className="p-table-items">{this.state.Tiles}</div>
          </div>
          <div className="legend">{this.state.Types}</div>
        </div>
      </div>
    );
  }
}

PTable.propTypes = {
  elements: PropTypes.array
};

const mapStateToProps = state => {
  return {
    elements: state.ptable.elements,
    search: state.ptable.search
  };
};

export default connect(mapStateToProps, null)(PTable);
