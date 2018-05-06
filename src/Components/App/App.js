import React, { Component } from "react";
import "./App.css";

// font awesome icons
import { library } from "@fortawesome/fontawesome-svg-core";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";

// import faTint from "@fortawesome/fontawesome-free-solid/faTint";
// import faCircle from "@fortawesome/fontawesome-free-solid/faCircle";
// import faCloud from "@fortawesome/fontawesome-free-solid/faCloud";
// import faHeart from "@fortawesome/fontawesome-free-solid/faHeart";
// import faThermometer from "@fortawesome/fontawesome-free-solid/faThermometer";
// import faSearch from "@fortawesome/fontawesome-free-solid/faSearch";

import Main from "../Main/Main";

class App extends Component {
  render() {
    library.add(far, fas);

    return (
      <div className="App">
        <Main />
      </div>
    );
  }
}

export default App;
