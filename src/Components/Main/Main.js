import React from "react";
import { Switch, Route } from "react-router-dom";
import "./Main.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import elementData from "../../Data/elements.json";
import typeData from "../../Data/types.json";

import Toolbar from "../Toolbar/Toolbar";
import PTable from "../PTable/PTable";
import PList from "../PList/PList";

export default class Main extends React.Component {
  constructor(props) {
    super(props);

    this.updateSearchTerm = this.updateSearchTerm.bind(this);
    this.filterElements = this.filterElements.bind(this);

    this.state = {
      theme: localStorage.getItem("theme") || "light",
      searchTerm: undefined,
      temperature: undefined,
      elementData: []
    };
  }

  componentDidMount() {
    this.getElementData();
  }

  changeTheme = () => {
    var newTheme = this.state.theme === "light" ? "dark" : "light";
    this.setState({ theme: newTheme });
    localStorage.setItem("theme", newTheme);
  };

  getElementData() {
    let elements = elementData.map((element, i) => {
      element.isActive = true;
      var type = typeData.find(
        e => e["name-singular"].toLowerCase() === element.type.toLowerCase()
      );
      if (type !== undefined) {
        element.types = element.type + " " + type["name-plural"];
      }
      return element;
    });
    this.setState({ elementData: elements }, () => {
      if (this.ptable) {
        this.ptable.generateTiles();
        this.ptable.getLegend();
      } else if (this.plist) this.plist.getElements();
    });
  }

  setElementsState() {
    let elements = elementData.forEach((element, i) => {
      var temp = this.state.temperature;
      if (
        this.state.temperature === undefined ||
        this.state.temperature === ""
      ) {
        element.state = undefined;
      } else {
        if (
          !element["melting-point"] ||
          parseFloat(temp) < parseFloat(element["melting-point"])
        )
          element.state = "solid";
        else if (
          !element["boiling-point"] ||
          parseFloat(temp) < parseFloat(element["boiling-point"])
        )
          element.state = "liquid";
        else element.state = "gas";
      }
    });
    this.setState({ elements: elements }, () => {
      this.updateComponents();
    });
  }

  filterElements() {
    var term = this.state.searchTerm;
    let elements = elementData.forEach((element, i) => {
      element.isActive = this.getElementStatus(term, element);
    });
    this.setState({ elements: elements }, () => {
      this.updateComponents();
    });
  }

  updateSearchInput = value => {
    this.toolbar.updateSearchInput(value);
  };

  updateSearchTerm = term => {
    this.setState({ searchTerm: term }, () => {
      this.filterElements();
    });
  };

  setTemp = temp => {
    this.setState({ temperature: temp }, () => {
      this.setElementsState();
    });
  };

  updateComponents() {
    var term = this.state.searchTerm;
    if (this.ptable) {
      this.ptable.generateTiles(term);
      this.ptable.getLegend(term);
    } else if (this.plist) {
      this.plist.getElements();
    }
  }

  getElementStatus(term, element) {
    if (term === "" || term === undefined) return true;
    else {
      term = term.toLowerCase();
      // search by property with : delimiter
      if (term.indexOf(":") !== -1) {
        var items = term.split(":");
        if (items.length === 2) {
          if (element[items[0]] === undefined) return true;
          else {
            if (items[0] === "type") items[0] = "types";
            var propVal = element[items[0]].toString().toLowerCase();
            if (propVal.indexOf(items[1]) !== -1) return true;
            else return false;
          }
        }
      } else {
        // search all
        if (element["atomic-number"].toString().indexOf(term) !== -1)
          return true;
        else if (element["symbol"].toLowerCase().indexOf(term) !== -1)
          return true;
        else if (element["atomic-name"].toLowerCase().indexOf(term) !== -1)
          return true;
        else if (element["type"].toLowerCase().indexOf(term) !== -1)
          return true;
        else return false;
      }
    }
  }

  render() {
    return (
      <div className={`main ${this.state.theme}`}>
        <Toolbar
          ref={instance => {
            this.toolbar = instance;
          }}
          theme={this.state.theme}
          requestChangeTheme={this.changeTheme}
          requestUpdateSearchTerm={this.updateSearchTerm}
          requestSetTemp={this.setTemp}
        />
        <Switch>
          <Route exact path="/">
            <div className="content container-fluid mt-3">
              <PTable
                ref={instance => {
                  this.ptable = instance;
                }}
                theme={this.state.theme}
                requestFilterElements={this.filterElements}
                requestUpdateSearchTerm={this.updateSearchTerm}
                requestUpdateSearchInput={this.updateSearchInput}
                elementData={this.state.elementData}
              />
            </div>
          </Route>
          <Route path="/list">
            <PList
              ref={instance => {
                this.plist = instance;
              }}
              requestFilterElements={this.filterElements}
            />
          </Route>
        </Switch>
        <footer>
          <div>
            <a
              href="https://github.com/david-j-lee/theptable"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
            </a>
          </div>
          <div>
            Made by{" "}
            <a
              href="http://www.davethedev.me"
              target="_blank"
              rel="noopener noreferrer"
            >
              David Lee
            </a>{" "}
            for Michelle Kang <FontAwesomeIcon icon="heart" size="xs" />
          </div>
        </footer>
      </div>
    );
  }
}
