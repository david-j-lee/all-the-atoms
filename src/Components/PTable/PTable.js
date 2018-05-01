import React from "react";
import "./PTable.css";

// import Logo from "../Icons/Logo/Logo";
// import elementData from "../../Data/elements.json";
import gridMapData from "../../Data/grid-map.json";
import groupData from "../../Data/groups.json";
import periodData from "../../Data/periods.json";
import typeData from "../../Data/types.json";

import Element from "../Element/Element";
import Empty from "../Empty/Empty";
import Group from "../Group/Group";
import Period from "../Period/Period";
import Placeholder from "../Placeholder/Placeholder";
import Type from "../Type/Type";

export default class PTable extends React.Component {
  constructor(props) {
    super(props);

    this.generateTiles = this.generateTiles.bind(this);
    this.getLegend = this.getLegend.bind(this);
    this.requestUpdateSearchInput = this.requestUpdateSearchInput.bind(this);

    this.state = {
      elementData: [],
      elements: [],
      legend: []
    };
  }

  componentWillMount() {
    this.props.requestFilterElements();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ elementData: nextProps.elementData }, () => {
      this.generateTiles();
    });
  }

  generateTiles(term) {
    let Elements = gridMapData.map((a, i) => {
      if (typeof a === "number") {
        var element = this.state.elementData.find(
          e => e["atomic-number"] === a
        );
        if (element !== undefined) {
          return <Element key={i} theme={this.props.theme} element={element} />;
        }
      } else if (typeof a === "string") {
        if (a === "") {
          return <Empty key={i} />;
        } else if (a.indexOf("g") !== -1) {
          var group = groupData.find(
            g => g.number.toString() === a.replace("g", "")
          );
          return <Group key={i} group={group} />;
        } else if (a.indexOf("p") !== -1) {
          var period = periodData.find(
            p => p.number.toString() === a.replace("p", "")
          );
          return <Period key={i} period={period} />;
        } else if (a === "l" || a === "a") {
          return (
            <Placeholder
              key={i}
              type={a}
              isActive={
                term === undefined || term === "" || term === null
                  ? true
                  : false
              }
            />
          );
        }
      }
      return <Empty key={i} />;
    });
    this.setState({ elements: Elements });
  }

  getLegend(type) {
    if (type) {
      type = type.toLowerCase();
    }
    let Types = typeData.map((a, i) => {
      var isActive =
        `type:${a["name-singular"].toLowerCase()}` === type ||
        `type:${a["name-plural"].toLowerCase()}` === type
          ? true
          : false;
      return (
        <Type
          key={i}
          type={a}
          isActive={isActive}
          requestUpdateSearchInput={this.requestUpdateSearchInput}
        />
      );
    });
    this.setState({ legend: Types });
  }

  requestUpdateSearchInput(value) {
    this.props.requestUpdateSearchInput(value);
    this.props.requestUpdateSearchTerm(value);
  }

  render() {
    return (
      <div className="p-table-container">
        <div className="p-table">
          <div className="p-table-items">{this.state.elements}</div>
        </div>
        <div className="legend">{this.state.legend}</div>
      </div>
    );
  }
}
