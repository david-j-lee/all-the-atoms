import React from "react";
import "./Element.css";

// redux
import { connect } from "react-redux";

// material
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

// reactstrap
import { Popover, PopoverHeader, PopoverBody } from "reactstrap";

// font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export class Element extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      popoverOpen: false,
      displayValueText: ""
    };
  }

  componentWillMount() {
    this.setState({ displayValueText: this.props.displayValueText });
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.displayValueText !== nextProps.displayValueText) {
      this.setState({ displayValueText: nextProps.displayValueText });
    }
  }

  togglePopover = () => {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  };

  openPopover = () => {
    if (this.pendingClose) {
      clearTimeout(this.pendingClose);
      this.pendingClose = null;
    }
    this.setState({
      popoverOpen: true
    });
  };

  closePopover = () => {
    this.pendingClose = setTimeout(() =>
      this.setState({
        popoverOpen: false
      })
    );
  };

  render() {
    const element = this.props.element;
    const normalizedType = element["type"].replace(/\s+/g, "-").toLowerCase();
    const elementClassName = `element-body
      ${normalizedType}-bg
      group-${element["group"]}
      period-${element["period"]}`;

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
          icon = "tint";
          break;
        case "gas":
          icon = "cloud";
          break;
        default:
          break;
      }
      State = <FontAwesomeIcon icon={icon} size="xs" />;
    }

    let Points = "";
    if (element["melting-point"] || element["boiling-point"]) {
      Points = (
        <div className="container-fluid my-3">
          <div className="row text-center">
            <div className="col-md-6 nowrap">
              <FontAwesomeIcon
                icon="tint"
                size="xs"
                className={`${normalizedType}-text`}
              />{" "}
              <span className="">
                <Typography>{element["melting-point-converted"]}</Typography>
              </span>
            </div>
            <div className="col-md-6 nowrap">
              <FontAwesomeIcon
                icon="cloud"
                size="xs"
                className={`${normalizedType}-text`}
              />{" "}
              <span className="">
                <Typography>{element["boiling-point-converted"]}</Typography>
              </span>
            </div>
          </div>
        </div>
      );
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
          className={`${elementClassName} ${
            element.isActive ? "active" : "inactive"
          }`}
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
            <div className="display-value">{element["display-value"]}</div>
          </div>
        </div>
        <Popover
          placement="right"
          target={"Popover-" + element.symbol}
          isOpen={this.state.popoverOpen}
          toggle={this.togglePopover}
          className={this.props.theme.palette.type}
        >
          <div className={`popover-header-wrapper ${normalizedType}-bg`}>
            <PopoverHeader>{element["atomic-name"]}</PopoverHeader>
          </div>
          <PopoverBody>
            <Paper className="p-3">
              <table>
                <tbody>
                  <tr>
                    <td className="header">
                      <Typography>Atomic Number</Typography>
                    </td>
                    <td className="text-right">
                      <Typography>{element["atomic-number"]}</Typography>
                    </td>
                  </tr>
                  <tr>
                    <td className="header">
                      <Typography>Symbol</Typography>
                    </td>
                    <td className="text-right">
                      <Typography>{element["symbol"]}</Typography>
                    </td>
                  </tr>
                  <tr>
                    <td className="header">
                      <Typography>Type</Typography>
                    </td>
                    <td
                      className={`text-right ${normalizedType}-border-bottom pb-0`}
                    >
                      <Typography>{element["type"]}</Typography>
                    </td>
                  </tr>
                  <tr>
                    <td className="header">
                      <Typography>{this.state.displayValueText}</Typography>
                    </td>
                    <td className="text-right">
                      <Typography>{element["display-value"]}</Typography>
                    </td>
                  </tr>
                </tbody>
              </table>
              {Points}
            </Paper>
          </PopoverBody>
        </Popover>
      </button>
    );
  }
}

const mapStateToProps = state => {
  return {
    theme: state.ptable.theme,
    displayValue: state.ptable.displayValue,
    displayValueText: state.ptable.displayValueText
  };
};

export default connect(mapStateToProps, null)(Element);
