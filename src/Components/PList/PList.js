import React from "react";
import { Table } from "reactstrap";
import "./PList.css";

import elementData from "../../Data/elements.json";

export default class PList extends React.Component {
  constructor(prop) {
    super(prop);

    this.state = {
      elements: []
    };
  }

  componentWillMount() {
    this.props.requestFilterElements();
  }

  getElements() {
    let Elements = elementData.map((element, i) => {
      if (!element.isActive) {
        return undefined;
      } else {
        let typeClassSafe = element["type"].replace(/\s+/g, "-").toLowerCase();
        return (
          <tr key={i}>
            <td className="text-right">{element["atomic-number"]}</td>
            <td>{element["symbol"]}</td>
            <td>{element["atomic-name"]}</td>
            <td className="text-right">{element["atomic-mass"]}</td>
            <td>
              <span className={`${typeClassSafe}-border-bottom pb-0`}>
                {element["type"]}
              </span>
            </td>
            <td className="text-right">{element["period"]}</td>
            <td className="text-right">{element["group"]}</td>
            <td className="text-right">{element["melting-point"]}</td>
            <td className="text-right">{element["boiling-point"]}</td>
            <td>{element["state"]}</td>
          </tr>
        );
      }
    });
    this.setState({ elements: Elements });
  }

  render() {
    return (
      <div className="content">
        <Table id="plist" responsive striped>
          <thead>
            <tr className="text-center">
              <th>#</th>
              <th>Symbol</th>
              <th>Name</th>
              <th>Mass</th>
              <th>Type</th>
              <th>Period</th>
              <th>Group</th>
              <th>Melt (K)</th>
              <th>Boil (K)</th>
              <th>State</th>
            </tr>
          </thead>
          <tbody>{this.state.elements}</tbody>
        </Table>
      </div>
    );
  }
}
