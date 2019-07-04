import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from '../context';

// material
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles } from '@material-ui/styles';

import TableChartIcon from '@material-ui/icons/TableChart';
import GridOnIcon from '@material-ui/icons/GridOn';

// components
import ThemePicker from './ThemePicker';
import { useRouter } from './HookedBrowserRouter';

export default function Navbar() {
  const classes = useStyles();
  const { toggleMenu } = useContext()[1];
  const router = useRouter();

  console.log(router);

  return (
    <AppBar className={classes.muiNavbar} position="fixed">
      <Toolbar>
        <img src="/favicon.png" alt="Logo" />
        <Hidden xsDown>
          <Typography variant="h6" color="inherit">
            All the Atoms
          </Typography>
        </Hidden>
        <div className={classes.flexGrow} />
        {router.location.pathname === '/list' && (
          <IconButton component={Link} to="/" color="inherit">
            <GridOnIcon />
          </IconButton>
        )}
        {router.location.pathname === '/' && (
          <IconButton component={Link} to="/list" color="inherit">
            <TableChartIcon />
          </IconButton>
        )}
        <ThemePicker />
        <Hidden lgUp>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            className={classes.menuButton}
            onClick={toggleMenu}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}

const useStyles = makeStyles(theme => ({
  muiNavbar: {
    '& img': {
      height: 25,
      marginRight: theme.spacing(2),
    },
    [theme.breakpoints.up('lg')]: {
      marginRight: 250,
      width: 'calc(100% - 250px)',
    },
  },
  flexGrow: {
    flexGrow: 1,
  },
}));
