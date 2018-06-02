import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./Main.css";

// redux
import { connect } from "react-redux";
import { getTheme, getElements } from "../../Actions/ptableAction";

// material
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

// components
import Navbar from "../Navbar/Navbar";
import PTable from "../PTable/PTable";
import PList from "../PList/PList";
import Footer from "../Footer/Footer";
import Sidebar from "../Sidebar/Sidebar";

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
    console.log(this.state.theme !== nextProps.theme)
    if (this.state.theme !== nextProps.theme) {
      this.setState({ theme: nextProps.theme });
    }
  }

  render() {
    const theme = createMuiTheme(this.state.theme);
    if (this.state.theme.palette) {
      return (
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter>
            <div className="site-wrapper">
              <Navbar />
              <div className="main">
                <div className="main-content">
                  <Route exact path="/" component={PTable} />
                  <Route path="/list" component={PList} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Main);
