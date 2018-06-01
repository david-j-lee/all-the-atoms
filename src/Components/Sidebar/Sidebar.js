import React from "react";
import { PropTypes } from "prop-types";
import "./Sidebar.css";

// redux
import { connect } from "react-redux";
import {
  toggleMenu,
  searchElements,
  setElementalState,
  setDisplayValue,
  setTempUnit
} from "../../Actions/ptableAction";

// material design
import { Typography } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";

// material icons
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import ThemePicker from "../ThemePicker/ThemePicker";

export class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.searchTimer = 0;
    this.tempTimer = 0;

    this.state = {
      menuMobileOpen: false,
      search: this.props.search,
      temperature: this.props.temperature,
      temperatureUnit: this.props.temperatureUnit,
      displayValue: this.props.displayValue
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ search: nextProps.search });
    this.setState({ temperature: nextProps.temperature });
    this.setState({ temperatureUnit: nextProps.temperatureUnit });
    this.setState({ menuMobileOpen: nextProps.menuMobileOpen });
  }

  toggleMenu = () => {
    this.props.toggleMenu(this.state.menuMobileOpen);
  };

  handleSearchChange = e => {
    const value = e.target.value; // must set for synthetic event
    this.setState({ search: value });
    if (this.searchTimer) {
      clearTimeout(this.searchTimer);
    }
    this.searchTimer = setTimeout(() => {
      this.props.searchElements(value);
    }, 500);
  };

  handleSearchKeyDown = e => {
    if (e.keyCode === 13) {
      this.setState({ search: e.target.value });
      if (this.searchTimer) {
        clearTimeout(this.searchTimer);
      }
      this.props.searchElements(e.target.value);
    }
  };

  handleTempChange = e => {
    const value = e.target.value;
    this.setState({ temperature: value });
    if (this.searchTimer) {
      clearTimeout(this.searchTimer);
    }
    this.searchTimer = setTimeout(() => {
      this.props.setElementalState(value);
    }, 500);
  };

  handleTempKeyDown = e => {
    if (e.keyCode === 13) {
      this.setState({ temperature: e.target.value });
      if (this.searchTimer) {
        clearTimeout(this.searchTimer);
      }
      this.props.setElementalState(e.target.value);
    }
  };

  handleDisplayChange = e => {
    this.setState({ displayValue: e.target.value });
    this.props.setDisplayValue(e.target.value);
  };

  handleChangeUnit = e => {
    this.setState({ temperatureUnit: e.target.value });
    this.props.setTempUnit(e.target.value);
  };

  render() {
    const drawer = (
      <div className="sideBar-wrapper">
        <div className="sideBar-drawer-content">
          <Hidden lgUp>
            <div className="sideBar-top">
              <IconButton onClick={this.toggleMenu}>
                <ChevronRightIcon />
              </IconButton>
            </div>
            <Divider className="mb-3" />
          </Hidden>
          <div className="sideBar-content">
            <FormControl className="mx-3 my-1 my-md-3">
              <TextField
                label="Search"
                onChange={this.handleSearchChange}
                onKeyDown={this.handleSearchKeyDown}
                value={this.state.search}
              />
            </FormControl>
            <div className="mx-3 mt-1 mb-3 row">
              <FormControl className="col-auto col-temp">
                <TextField
                  label="Temperature"
                  onChange={this.handleTempChange}
                  onKeyDown={this.handleTempKeyDown}
                  value={this.state.temperature}
                />
              </FormControl>
              <FormControl className="col-auto col-temp-unit">
                <InputLabel htmlFor="temperature-unit" />
                <Select
                  value={this.state.temperatureUnit}
                  onChange={this.handleChangeUnit}
                  inputProps={{
                    name: "unit",
                    id: "temperature-unit"
                  }}
                >
                  <MenuItem value="k">K</MenuItem>
                  <MenuItem value="c">C</MenuItem>
                  <MenuItem value="f">F</MenuItem>
                </Select>
              </FormControl>
            </div>
            <Divider className="mt-3" />
            <FormControl className="mx-3 my-3">
              <RadioGroup
                name="display"
                value={this.state.displayValue}
                onChange={this.handleDisplayChange}
                className="sideBar-display"
              >
                <FormControlLabel
                  value="atomic-mass"
                  control={<Radio color="primary" />}
                  label="Atomic Mass"
                />
                <FormControlLabel
                  value="electronegativity"
                  control={<Radio color="primary" />}
                  label="Electronegativity"
                />
                <FormControlLabel
                  value="electron-configuration"
                  control={<Radio color="primary" />}
                  label="Electron configuration"
                />
                <FormControlLabel
                  value="ionization-energies"
                  control={<Radio color="primary" />}
                  label="Ionization Energies"
                />
              </RadioGroup>
            </FormControl>
            <Divider className="mb-3" />
            <div className="mx-3">
              <ThemePicker />
            </div>
          </div>
          <div className="sideBar-link">
            <Typography className="typo-sm">
              <a
                href="https://github.com/david-j-lee/theptable"
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none"
              >
                <Button color="secondary" size="small">
                  Github
                </Button>
              </a>
            </Typography>
          </div>
        </div>
      </div>
    );

    return (
      <div className="sideBar">
        <Hidden lgUp>
          <Drawer
            variant="temporary"
            anchor="right"
            open={this.state.menuMobileOpen}
            onClose={this.toggleMenu}
            classes={{ paper: "sideBar-drawer" }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden mdDown>
          <Drawer
            variant="permanent"
            open
            anchor="right"
            classes={{ paper: "sideBar-drawer" }}
          >
            {drawer}
          </Drawer>
        </Hidden>
      </div>
    );
  }
}

Sidebar.propTypes = {
  search: PropTypes.string,
  temperature: PropTypes.any,
  menuMobileOpen: PropTypes.any
};

const mapStateToProps = state => {
  return {
    search: state.ptable.search,
    temperature: state.ptable.temperature,
    temperatureUnit: state.ptable.temperatureUnit,
    menuMobileOpen: state.ptable.menuMobileOpen,
    displayValue: state.ptable.displayValue
  };
};

const mapDispatchToProps = {
  toggleMenu,
  searchElements,
  setElementalState,
  setDisplayValue,
  setTempUnit
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
