import React from "react";
import { PropTypes } from "prop-types";

// redux
import { connect } from "react-redux";
import {
  toggleMenu,
  searchElements,
  setElementalState,
  setDisplayValue,
  setTempUnit
} from "../actions/tableActions";

// material design
import { withStyles } from "@material-ui/core";
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
import Typography from "@material-ui/core/Typography";

// material icons
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

// font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// components
import ThemePicker from "./ThemePicker";

const styles = theme => ({
  sideBar: {
    [theme.breakpoints.up('lg')]: {
      position: 'relative',
      minWidth: 250,
    },
  },
  section: {
    padding: theme.spacing.unit * 2,
  },
  content: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  link: {
    padding: '0.5rem 1rem',
    textAlign: 'center',
  },
  display: {
    flexWrap: 'nowrap',
  },
  drawer: {
    width: 250,
    minHeight: '100vh',
  },
  drawerContent: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  drawerTop: {
    height: 64,
    display: 'flex',
    alignItems: 'center',
  },
  search: {
    width: '100%',
  },
  temp: {
    display: 'flex',
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 0.5,
  },
  tempText: {
    width: 'calc(100% - 50px)',
  },
  tempUnit: {
    width: 50,
    textAlign: 'center',
  },
});

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
    if (this.state.search !== nextProps.search) {
      this.setState({ search: nextProps.search });
    }
    if (this.state.temperature !== nextProps.temperature) {
      this.setState({ temperature: nextProps.temperature });
    }
    if (this.state.temperatureUnit !== nextProps.temperatureUnit) {
      this.setState({ temperatureUnit: nextProps.temperatureUnit });
    }
    if (this.state.menuMobileOpen !== nextProps.menuMobileOpen) {
      this.setState({ menuMobileOpen: nextProps.menuMobileOpen });
    }
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
    const { classes } = this.props;
    const drawer = (
      <div className={classes.drawerContent}>
        <Hidden lgUp>
          <div className={classes.drawerTop}>
            <IconButton onClick={this.toggleMenu}>
              <ChevronRightIcon />
            </IconButton>
          </div>
          <Divider />
        </Hidden>
        <div className={classes.content}>
          <div className={classes.section}>
            <FormControl className={classes.search}>
              <TextField
                label="Search"
                onChange={this.handleSearchChange}
                onKeyDown={this.handleSearchKeyDown}
                value={this.state.search}
              />
            </FormControl>
            <div className={classes.temp}>
              <FormControl className={classes.tempText}>
                <TextField
                  label="Temperature"
                  onChange={this.handleTempChange}
                  onKeyDown={this.handleTempKeyDown}
                  value={this.state.temperature}
                />
              </FormControl>
              <FormControl className={classes.tempUnit}>
                <InputLabel htmlFor="temperature-unit" />
                <Select
                  value={this.state.temperatureUnit}
                  onChange={this.handleChangeUnit}
                  inputProps={{
                    name: "unit",
                    id: "temperature-unit"
                  }}>
                  <MenuItem value="k">K</MenuItem>
                  <MenuItem value="c">C</MenuItem>
                  <MenuItem value="f">F</MenuItem>
                </Select>
              </FormControl>
            </div>
            <Typography>
              <small>
                <FontAwesomeIcon icon="circle" size="xs" /> Solid
                &nbsp;&nbsp;&nbsp;
                <FontAwesomeIcon icon="tint" size="xs" /> Liquid
                &nbsp;&nbsp;&nbsp;
                <FontAwesomeIcon icon="cloud" size="xs" /> Gas
              </small>
            </Typography>
          </div>
          <Divider />
          <FormControl className={classes.section}>
            <RadioGroup
              name="display"
              value={this.state.displayValue}
              onChange={this.handleDisplayChange}
              className={classes.display}>
              <FormControlLabel
                value="atomic-mass"
                control={<Radio color="primary" />}
                label="Atomic Mass (g/mol)" />
              <FormControlLabel
                value="electronegativity"
                control={<Radio color="primary" />}
                label="Electronegativity" />
              <FormControlLabel
                value="electron-configuration"
                control={<Radio color="primary" />}
                label="Electron configuration" />
              <FormControlLabel
                value="ionization-energies"
                control={<Radio color="primary" />}
                label="Ionization Energies (kJ/mol)" />
            </RadioGroup>
          </FormControl>
          <Divider />
          <div className={classes.section}>
            <ThemePicker />
          </div>
        </div>
        <div className={classes.link}>
          <Button color="secondary" size="small"
            href="https://github.com/david-j-lee/thetable"
            target="_blank"
            rel="noopener noreferrer">
            Github
          </Button>
        </div>
      </div>
    );

    return (
      <div className={classes.sideBar}>
        <Hidden lgUp>
          <Drawer
            variant="temporary"
            anchor="right"
            open={this.state.menuMobileOpen}
            onClose={this.toggleMenu}
            classes={{ paper: classes.drawer }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}>
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden mdDown>
          <Drawer
            variant="permanent"
            open
            anchor="right"
            classes={{ paper: classes.drawer }}>
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
    search: state.table.search,
    temperature: state.table.temperature,
    temperatureUnit: state.table.temperatureUnit,
    menuMobileOpen: state.table.menuMobileOpen,
    displayValue: state.table.displayValue
  };
};

const mapDispatchToProps = {
  toggleMenu,
  searchElements,
  setElementalState,
  setDisplayValue,
  setTempUnit
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Sidebar));
