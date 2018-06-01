import React from "react";
import "./App.css";

// redux
import { Provider } from "react-redux";
import store from "../../store";

// font awesome icons
import { library } from "@fortawesome/fontawesome-svg-core";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";

import Main from "../Main/Main";

class App extends React.Component {
  componentWillMount() {}

  render() {
    library.add(far, fas);

    return (
      <Provider store={store} className="App">
        <Main />
      </Provider>
    );
  }
}

export default App;
