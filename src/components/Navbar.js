import React from "react";
import { Link } from "react-router-dom";

// redux
import { connect } from "react-redux";
import { toggleMenu } from "../actions/tableActions";

// material
import { withStyles } from '@material-ui/core';
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Hidden from "@material-ui/core/Hidden";

const styles = theme => ({
  // menuButton: {
  //   marginLeft: -12,
  //   marginRight: 20,
  // },
  muiNavbar: {
    [theme.breakpoints.up('lg')]: {
      marginRight: 250,
      width: 'calc(100% - 250px)',
    },
  },
  flexGrow: {
    flexGrow: 1,
  },
});

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
    const { classes } = this.props;

    return (
      <AppBar className={classes.muiNavbar} position="fixed">
        <Toolbar>
          <Typography variant="title" color="inherit">
            All the Atoms
          </Typography>
          <div className={classes.flexGrow} />
          <Button component={Link} to="/" color="inherit" size="small">
            Table
          </Button>
          <Button component={Link} to="/list" color="inherit" size="small">
            List
          </Button>
          <Button component={Link} to="/about" color="inherit" size="small">
            About
          </Button>
          <Hidden lgUp>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              className={classes.menuButton}
              onClick={this.toggleMenu}>
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
    menuMobileOpen: state.table.menuMobileOpen
  };
};

const mapDispatchToProps = {
  toggleMenu
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Navbar));
