import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

// redux
import { connect } from "react-redux";
import { getTheme, getElements } from "../actions/ptableActions";

// material
import { withStyles } from '@material-ui/core';
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

// components
import PTable from "./PTable";
import PList from "./PList";
import About from "./About";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";

const styles = theme => ({
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
});

export class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      theme: {}
    };
  }

  componentWillMount() {
    this.props.getTheme();
    this.props.getElements();
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.theme !== nextProps.theme) {
      this.setState({ theme: nextProps.theme });
    }
  }

  render() {
    const { classes } = this.props;
    const theme = createMuiTheme(this.state.theme);

    if (this.state.theme.palette) {
      return (
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter>
            <div className={classes.siteWrapper}>
              <Navbar />
              <div className={classes.main}>
                <div className={classes.mainContent}>
                  <Route exact path="/" component={PTable} />
                  <Route path="/list" component={PList} />
                  <Route path="/about" component={About} />
                </div>
                <Footer />
              </div>
              <Sidebar />
            </div>
          </BrowserRouter>
        </MuiThemeProvider>
      );
    } else {
      return <div />;
    }
  }
}

const mapStateToProps = state => {
  return {
    theme: state.ptable.theme
  };
};

const mapDispatchToProps = {
  getTheme,
  getElements
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Main));
