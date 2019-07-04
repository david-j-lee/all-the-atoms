import React from 'react';
import ContextProvider from '../context';

// font awesome icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';

import Main from './Main';

class App extends React.Component {
  componentWillMount() {}

  render() {
    library.add(far, fas);

    return (
      <ContextProvider className="App">
        <Main />
      </ContextProvider>
    );
  }
}

export default App;
