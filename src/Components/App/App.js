import React, { Component } from "react";
import "./App.css";

// font awesome icons
import fontawesome from "@fortawesome/fontawesome";
import faSun from "@fortawesome/fontawesome-free-solid/faSun";
import faMoon from "@fortawesome/fontawesome-free-solid/faMoon";
import faTint from "@fortawesome/fontawesome-free-solid/faTint";
import faCircle from "@fortawesome/fontawesome-free-solid/faCircle";
import faCloud from "@fortawesome/fontawesome-free-solid/faCloud";
import faHeart from "@fortawesome/fontawesome-free-solid/faHeart";
import faThermometer from "@fortawesome/fontawesome-free-solid/faThermometer";
import faSearch from "@fortawesome/fontawesome-free-solid/faSearch";

import Main from "../Main/Main";

class App extends Component {
  render() {
    fontawesome.library.add(
      faSun,
      faMoon,
      faTint,
      faCircle,
      faCloud,
      faHeart,
      faThermometer,
      faSearch
    );

    return (
      <div className="App">
        <Main />
      </div>
    );
  }
}

export default App;
