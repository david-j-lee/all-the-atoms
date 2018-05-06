import React from "react";
import { NavLink } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Collapse, Navbar, NavbarBrand, Nav, NavItem } from "reactstrap";
import "./Toolbar.css";

export default class Toolbar extends React.Component {
  constructor(props) {
    super(props);

    this.toggleMenu = this.toggleMenu.bind(this);
    this.toggleSearch = this.toggleSearch.bind(this);
    this.toggleTemp = this.toggleTemp.bind(this);

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchKeyDown = this.handleSearchKeyDown.bind(this);

    this.handleTempChange = this.handleTempChange.bind(this);
    this.handleTempKeyDown = this.handleTempKeyDown.bind(this);

    this.state = {
      icon: this.props.theme === "light" ? ["fas", "moon"] : ["far", "sun"],
      theme: this.props.theme,
      isNavExpanded: false,
      isSearchExpanded: false,
      isTempExpanded: false
    };

    this.searchTimer = 0;
    this.tempTimer = 0;
  }

  toggleMenu() {
    this.setState({ isNavExpanded: !this.state.isNavExpanded });
  }

  toggleSearch() {
    this.setState({ isSearchExpanded: !this.state.isSearchExpanded }, () => {
      if (this.state.isSearchExpanded) {
        this.searchInput.focus();
      } else {
        this.props.requestUpdateSearchTerm(undefined);
        this.searchInput.value = "";
      }
    });
  }

  toggleTemp() {
    this.setState({ isTempExpanded: !this.state.isTempExpanded }, () => {
      if (this.state.isTempExpanded) {
        this.tempInput.focus();
      } else {
        this.props.requestSetTemp(undefined);
        this.tempInput.value = "";
      }
    });
  }

  requestChangeTheme = () => {
    this.props.requestChangeTheme();
    this.setState({
      icon: this.props.theme === "light" ? ["fas", "sun"] : ["fas", "moon"],
      theme: this.state.theme === "light" ? "dark" : "light"
    });
  };

  updateSearchInput(value) {
    this.setState({ isSearchExpanded: true }, () => {
      this.searchInput.value = value;
    });
  }

  handleSearchChange(e) {
    const text = e.target.value;
    if (this.searchTimer) clearTimeout(this.searchTimer);
    this.searchTimer = setTimeout(() => {
      this.props.requestUpdateSearchTerm(text);
    }, 1000);
  }

  handleSearchKeyDown(e) {
    if (e.keyCode === 13) {
      if (this.searchTimer) clearTimeout(this.searchTimer);
      this.props.requestUpdateSearchTerm(e.target.value);
    }
  }

  handleTempChange(e) {
    const text = e.target.value;
    if (this.searchTimer) clearTimeout(this.searchTimer);
    this.searchTimer = setTimeout(() => {
      this.props.requestSetTemp(text);
    }, 500);
  }

  handleTempKeyDown(e) {
    if (e.keyCode === 13) {
      if (this.searchTimer) clearTimeout(this.searchTimer);
      this.props.requestSetTemp(e.target.value);
    }
  }

  render() {
    let Toggler = (
      <div
        className={`menu-toggler ${
          this.state.isNavExpanded ? "expanded" : "collapsed"
        }`}
        onClick={this.toggleMenu}
      >
        <div className="bar1" />
        <div className="bar2" />
        <div className="bar3" />
      </div>
    );

    let Search = (
      <div
        className={`${this.state.isSearchExpanded ? "expanded" : "collapsed"}`}
      >
        <div className="input-group my-3 my-md-0">
          <div className="input-group-prepend">
            <button
              className="input-group-text d-none d-md-block my-2"
              onClick={this.toggleSearch}
            >
              <FontAwesomeIcon icon="search" size="lg" />
            </button>
            <span className="input-group-text d-md-none my-2">
              <FontAwesomeIcon icon="search" size="lg" />
            </span>
          </div>
          <input
            ref={input => {
              this.searchInput = input;
            }}
            className="form-control"
            type="search"
            placeholder="Search"
            aria-label="Search"
            onChange={this.handleSearchChange}
            onKeyDown={this.handleSearchKeyDown}
          />
        </div>
      </div>
    );

    let Temp = (
      <div
        className={`${this.state.isTempExpanded ? "expanded" : "collapsed"}`}
      >
        <div className="temp input-group my-3 my-md-0">
          <div className="input-group-prepend">
            <button
              className="input-group-text d-none d-md-block my-2"
              onClick={this.toggleTemp}
            >
              <FontAwesomeIcon icon="thermometer" size="lg" />
            </button>
            <span className="input-group-text d-md-none my-2">
              <FontAwesomeIcon icon="thermometer" size="lg" />
            </span>
          </div>
          <input
            ref={input => {
              this.tempInput = input;
            }}
            className="form-control pr-1"
            type="number"
            placeholder="Temp"
            aria-label="Set Temperature (Kelvins)"
            onChange={this.handleTempChange}
            onKeyDown={this.handleTempKeyDown}
            min="0"
            max="6000"
          />
          <div className="input-group-append">
            <span className="input-group-text py-2">K</span>
          </div>
        </div>
      </div>
    );

    let Theme = (
      <div onClick={this.requestChangeTheme} className="my-3 my-md-2">
        <button className="theme-toggler btn-no-style">
          <FontAwesomeIcon icon={this.state.icon} size="lg" />
          <span className="d-md-none">
            {this.state.theme === "light" ? "Light Side" : "Dark Side"}
          </span>
        </button>
      </div>
    );

    return (
      <div>
        <Navbar
          fixed="top"
          className={`navbar-${this.state.theme} bg-${this.state.theme}`}
          expand="md"
        >
          <NavbarBrand href="/">PTable</NavbarBrand>
          {Toggler}
          <Collapse isOpen={this.state.isNavExpanded} navbar>
            <Nav navbar>
              <NavItem>
                <NavLink to="/" className="nav-link" exact={true}>
                  Table
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/list" className="nav-link">
                  List
                </NavLink>
              </NavItem>
            </Nav>
            <Nav navbar className="ml-auto">
              {Search}
              {Temp}
              {Theme}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
