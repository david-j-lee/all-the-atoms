import React, { useState, useRef, useEffect } from 'react';
import { useContext } from '../context';

// material design
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';

// material icons
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

// font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// components
import ThemePicker from './ThemePicker';

export default function Sidebar() {
  const classes = useStyles();
  const [
    { search, temperature, temperatureUnit, menuMobileOpen, displayValue },
    {
      toggleMenu,
      searchElements,
      setElementalState,
      setDisplayValue,
      setTempUnit,
    },
  ] = useContext();

  const [searchLocal, setSearchLocal] = useState(search);
  const [temperatureLocal, setTemperatureLocal] = useState(temperature);

  const searchTimer = useRef(null);
  const tempTimer = useRef(null);

  const handleSearchChange = e => {
    const value = e.target.value; // must set for synthetic event
    setSearchLocal(value);
    if (searchTimer.current) {
      clearTimeout(searchTimer.current);
    }
    searchTimer.current = setTimeout(() => {
      searchElements(value);
    }, 500);
  };

  const handleSearchKeyDown = e => {
    if (e.keyCode === 13) {
      setSearchLocal(e.target.value);
      if (searchTimer.current) {
        clearTimeout(searchTimer);
      }
      searchElements(e.target.value);
    }
  };

  const handleTempChange = e => {
    const value = e.target.value;
    setTemperatureLocal(value);
    if (tempTimer.current) {
      clearTimeout(tempTimer.current);
    }
    tempTimer.current = setTimeout(() => {
      setElementalState(value);
    }, 500);
  };

  const handleTempKeyDown = e => {
    if (e.keyCode === 13) {
      setTemperatureLocal(e.target.value);
      if (tempTimer.current) {
        clearTimeout(tempTimer.current);
      }
      setElementalState(e.target.value);
    }
  };

  useEffect(() => {
    setSearchLocal(search);
  }, [search]);

  const drawer = (
    <div className={classes.drawerContent}>
      <Hidden lgUp>
        <div className={classes.drawerTop}>
          <IconButton onClick={toggleMenu}>
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
              onChange={handleSearchChange}
              onKeyDown={handleSearchKeyDown}
              value={searchLocal}
            />
          </FormControl>
          <div className={classes.temp}>
            <FormControl className={classes.tempText}>
              <TextField
                label="Temperature"
                onChange={handleTempChange}
                onKeyDown={handleTempKeyDown}
                value={temperatureLocal}
              />
            </FormControl>
            <FormControl className={classes.tempUnit}>
              <InputLabel htmlFor="temperature-unit" />
              <Select
                value={temperatureUnit}
                onChange={e => setTempUnit(e.target.value)}
                inputProps={{
                  name: 'unit',
                  id: 'temperature-unit',
                }}
              >
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
            value={displayValue}
            onChange={e => setDisplayValue(e.target.value)}
            className={classes.display}
          >
            <FormControlLabel
              value="atomic-mass"
              control={<Radio color="primary" />}
              label="Atomic Mass (g/mol)"
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
              label="Ionization Energies (kJ/mol)"
            />
          </RadioGroup>
        </FormControl>
        <Divider />
        <div className={classes.section}>
          <ThemePicker />
        </div>
      </div>
      <div className={classes.link}>
        <Button
          color="secondary"
          size="small"
          href="https://github.com/david-j-lee/thetable"
          target="_blank"
          rel="noopener noreferrer"
        >
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
          open={menuMobileOpen}
          onClose={toggleMenu}
          classes={{ paper: classes.drawer }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
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
          classes={{ paper: classes.drawer }}
        >
          {drawer}
        </Drawer>
      </Hidden>
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  sideBar: {
    [theme.breakpoints.up('lg')]: {
      position: 'relative',
      minWidth: 250,
    },
  },
  section: {
    padding: theme.spacing(2),
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
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(0.5),
  },
  tempText: {
    width: 'calc(100% - 50px)',
  },
  tempUnit: {
    width: 50,
    textAlign: 'center',
  },
}));
