import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { useContext } from '../context';

// material
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider, makeStyles } from '@material-ui/styles';

// components
import Table from './Table';
import List from './List';
import Navbar from './Navbar';
import Footer from './Footer';
import Sidebar from './Sidebar';
import { HookedBrowserRouter } from './HookedBrowserRouter';

export default function Main() {
  const classes = useStyles();
  const [{ theme }] = useContext();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HookedBrowserRouter>
        <div className={classes.siteWrapper}>
          <Navbar />
          <div className={classes.main}>
            <div className={classes.mainContent}>
              <Route exact path="/" component={Table} />
              <Route path="/list" component={List} />
            </div>
            <Footer />
          </div>
          <Sidebar />
        </div>
      </HookedBrowserRouter>
    </ThemeProvider>
  );
}

const useStyles = makeStyles(theme => ({
  siteWrapper: {
    display: 'flex',
    position: 'relative',
    width: '100%',
    alignItems: 'stretch',
    minHeight: '100vh',
  },
  main: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '4rem',
    width: '100%',
  },
  mainContent: {
    flexGrow: 1,
    width: '100%',
  },
}));
