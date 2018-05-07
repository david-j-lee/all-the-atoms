import React from "react";
import "./Element.css";

import { Popover, PopoverHeader, PopoverBody } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class Element extends React.Component {
  constructor(props) {
    super(props);

    this.openPopover = this.openPopover.bind(this);
    this.closePopover = this.closePopover.bind(this);
    this.togglePopover = this.togglePopover.bind(this);

    this.state = {
      popoverOpen: false
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ isActive: nextProps.isActive });
  }

  togglePopover() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }

  openPopover() {
    if (this.pendingClose) {
      clearTimeout(this.pendingClose);
      this.pendingClose = null;
    }
    this.setState({
      popoverOpen: true
    });
  }

  closePopover() {
    this.pendingClose = setTimeout(() =>
      this.setState({
        popoverOpen: false
      })
    );
  }

  render() {
    const element = this.props.element;
    const normalizedType = element["type"].replace(/\s+/g, "-").toLowerCase();
    const className = `element-body
      ${normalizedType}-bg
      group-${element["group"]}
      period-${element["period"]}`;

    // set element atomic mass
    if (element["atomic-mass"] < 0) {
      element["atomic-mass-formatted"] =
        "[" + element["atomic-mass"] * -1 + "]";
    } else {
      element["atomic-mass-formatted"] =
        element["atomic-mass"].toFixed(
          4 - element["atomic-mass"].toFixed(0).length
        ) + "";
    }

    // show element state if it exists
    // the state is set when a temperature is set
    let State = "";
    if (element.state !== undefined) {
      let icon = "";
      switch (element.state) {
        case "solid":
          icon = "circle";
          break;
        case "liquid":
          icon = "circle";
          break;
        case "gas":
          icon = "cloud";
          break;
        default:
          break;
      }
      State = <FontAwesomeIcon icon={icon} size="xs" />;
    }

    return (
      <button
        className="element-container"
        onClick={this.togglePopover}
        id={"Popover-" + element.symbol}
        onMouseEnter={this.openPopover}
        onMouseLeave={this.closePopover}
      >
        <div
          className={`${className} ${element.isActive ? "active" : "inactive"}`}
        >
          <div className="element-info">
            <div className="atomic-number d-flex">
              <span>{element["atomic-number"]}</span>
              <span className="element-state ml-auto">{State}</span>
            </div>
            <div className="symbol">{element["symbol"]}</div>
            <div className="atomic-name d-none d-lg-block">
              {element["atomic-name"]}
            </div>
            <div className="atomic-mass">
              {element["atomic-mass-formatted"]}
            </div>
          </div>
        </div>
        <Popover
          placement="right"
          target={"Popover-" + element.symbol}
          isOpen={this.state.popoverOpen}
          toggle={this.togglePopover}
          className={this.props.theme}
        >
          <div className={`popover-header-wrapper ${normalizedType}-bg`}>
            <PopoverHeader>{element["atomic-name"]}</PopoverHeader>
          </div>
          <PopoverBody>
            <table>
              <tbody>
                <tr>
                  <td>Atomic Number</td>
                  <td className="text-right">{element["atomic-number"]}</td>
                </tr>
                <tr>
                  <td>Symbol</td>
                  <td className="text-right">{element["symbol"]}</td>
                </tr>
                <tr>
                  <td>Type</td>
                  <td
                    className={`text-right ${normalizedType}-border-bottom pb-0`}
                  >
                    {element["type"]}
                  </td>
                </tr>
                <tr>
                  <td>Atomic Mass</td>
                  <td className="text-right">
                    {element["atomic-mass-formatted"]}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="container-fluid my-3">
              <div className="row text-center">
                <div className="col-md-6 nowrap">
                  <FontAwesomeIcon
                    icon="tint"
                    size="xs"
                    className={`${normalizedType}-text`}
                  />{" "}
                  <span className="">{element["melting-point"]} K</span>
                </div>
                <div className="col-md-6 nowrap">
                  <FontAwesomeIcon
                    icon="cloud"
                    size="xs"
                    className={`${normalizedType}-text`}
                  />{" "}
                  <span className="">{element["boiling-point"]} K</span>
                </div>
              </div>
            </div>
          </PopoverBody>
        </Popover>
      </button>
    );
  }
}
