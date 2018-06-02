import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

// redux
import { connect } from "react-redux";
import { toggleMenu } from "../../Actions/ptableAction";

// material
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Hidden from "@material-ui/core/Hidden";

export class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      menuMobileOpen: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.menuMobileOpen !== nextProps.menuMobileOpen) {
      this.setState({ menuMobileOpen: nextProps.menuMobileOpen });
    }
  }

  toggleMenu = () => {
    this.props.toggleMenu(this.state.menuMobileOpen);
  }

  render() {
    return (
      <AppBar className="mui-navbar" position="fixed">
        <Toolbar>
          <Typography variant="title" color="inherit">
            PTable
          </Typography>
          <div className="flex-grow-1" />
          <Button component={Link} to="/" color="inherit" size="small">
            Table
          </Button>
          <Button component={Link} to="/list" color="inherit" size="small">
            List
          </Button>
          <Hidden lgUp>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              className="menu-button"
              onClick={this.toggleMenu}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = state => {
  return {
    menuMobileOpen: state.ptable.menuMobileOpen
  };
};

const mapDispatchToProps = {
  toggleMenu
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
